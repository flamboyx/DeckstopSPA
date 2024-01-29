import enemyImg_1 from './images/enemy.png';
import { useUserStore } from './stores/user';

export function game(): void {
    type coords = {
        x: number,
        y: number
    }

    interface elObj {
        coords: coords,
        height: number,
        width: number
    }

    interface player extends elObj {
        moveDirection: {
            top: number,
            bottom: number,
            left: number,
            right: number
        }
    }

    const userStore = useUserStore()
    const token = userStore.user.access

    let beginning: boolean = true;
    let middle: boolean = false;
    let isPause: boolean = false;
    let isWorking: boolean = true;
    let isDead: boolean = false;
    let invincible: boolean = false;
    let animationId: number;

    let isShooting: boolean = false;
    let shootInterval: number;
    let animShoot: number;

    let animBullet: number;
    let animEnemy: number;
    let animSpawnEnemy: number;
    let enemyInterval: number;

    let speed: number = 4;

    const gameOver: Element = document.querySelector('#game_over')!;

    const scoreEl: Element = document.querySelector('#score')!;
    let score: number = 0;

    const livesEl: Element = document.querySelector('#lives')!;
    let lives: number = 3;
    const invincibleTimer: number = 3000;

    const navEl: Element = document.querySelector('#nav')!;

    const roadEl: Element = document.querySelector('#road')!;
    const road: elObj = createElementObject(roadEl);

    const playerEl: Element = document.querySelector('#player')!;
    const player: player = {
        ...createElementObject(playerEl),
        moveDirection: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    }

    const stars: NodeListOf<Element> = document.querySelectorAll('.stars')!;
    const stars_1_1: Element = stars[0];
    const stars_2_1: Element = stars[1];
    const stars_1_2: Element = stars[2];
    const stars_2_2: Element = stars[3];
    const coordsStars_1_1: coords = getCoords(stars_1_1);
    const coordsStars_2_1: coords = getCoords(stars_2_1);
    const coordsStars_1_2: coords = getCoords(stars_1_2);
    const coordsStars_2_2: coords = getCoords(stars_2_2);

    const bg_sprites: NodeListOf<Element> = document.querySelectorAll('.bg_sprite')!;
    const bg_sprite_1: Element = bg_sprites[0];
    const bg_sprite_2: Element = bg_sprites[1];
    const coordsBg_sprite_1: coords = getCoords(bg_sprite_1)
    const coordsBg_sprite_2: coords = getCoords(bg_sprite_2)

    animationId = requestAnimationFrame(startGame);

    function startGame(): void {
        if (beginning) {
            setTimeout(spawnEnemy, 2000);
            beginning = false;
            middle = true;
        } else if (middle) {
            enemyInterval = setInterval((): void => {
                animSpawnEnemy = requestAnimationFrame(spawnEnemy);
                }, 5000);
            middle = false;
        }

        animBullet = requestAnimationFrame(bulletLogic);
        animEnemy = requestAnimationFrame(enemyLogic);

        backgroundAnimation();
        animationId = requestAnimationFrame(startGame);
    }

    function randomNumberBetween(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    function createElementObject(el: Element) {
        return {
            coords: getCoords(el),
            height: el.clientHeight,
            width: el.clientWidth
        };
    }

    function getCoords(el: Element): coords {
        const matrix = window.getComputedStyle(el).transform.split(', ');
        const x: number = parseFloat(matrix[matrix.length - 2]);
        const y: number = parseFloat(matrix[matrix.length - 1]);

        return {x: x, y: y};
    }

    function hasCollision(el1: elObj, el2: elObj): boolean {
        const el1_top: number = el1.coords.y;
        const el1_bottom: number = el1.coords.y + el1.height;
        const el1_left: number = el1.coords.x;
        const el1_right: number = el1.coords.x + el1.width;

        const el2_top: number = el2.coords.y;
        const el2_bottom: number = el2.coords.y + el2.height;
        const el2_left: number = el2.coords.x;
        const el2_right: number = el2.coords.x + el2.width;

        if (el1_bottom < el2_top || el1_top > el2_bottom) {
            return false;
        }

        if (el1_right < el2_left || el1_left > el2_right) {
            return false;
        }

        return true;
    }

    function spawnEnemy(): void {
        const enemyEl: HTMLDivElement = document.createElement('img');

        enemyEl.setAttribute('class', 'enemy')
        enemyEl.setAttribute('src',
            `${enemyImg_1}`);

        roadEl?.appendChild(enemyEl);
        const enemy: elObj = createElementObject(enemyEl);

        const enemyX: number = randomNumberBetween(-road.width, -enemy.width);
        const enemyY: number = randomNumberBetween(-enemy.height * 6, -enemy.height * 2);
        enemyEl.setAttribute('style',
            `transform: translate(${enemyX}px, ${enemyY}px)`);
    }

    function backgroundAnimation(): void {
        let newCoordY_stars_1_1: number = coordsStars_1_1.y + speed / 3;
        let newCoordY_stars_2_1: number = coordsStars_2_1.y + speed / 6;
        let newCoordY_stars_1_2: number = coordsStars_1_2.y + speed / 3;
        let newCoordY_stars_2_2: number = coordsStars_2_2.y + speed / 6;

        let newCoordX_Bg_sprite_1: number = coordsBg_sprite_1.x;
        let newCoordX_Bg_sprite_2: number = coordsBg_sprite_2.x;
        let newCoordY_Bg_sprite_1: number = coordsBg_sprite_1.y + speed / 4;
        let newCoordY_Bg_sprite_2: number = coordsBg_sprite_2.y + speed / 2;

        if (newCoordY_stars_1_1 > window.innerHeight) {
            const height: any = stars_1_1.clientHeight + navEl.clientHeight;
            newCoordY_stars_1_1 = -parseFloat(height);
        }

        if (newCoordY_stars_2_1 > window.innerHeight) {
            const height: any = stars_2_1.clientHeight + navEl.clientHeight;
            newCoordY_stars_2_1 = -parseFloat(height);
        }

        if (newCoordY_stars_1_2 > window.innerHeight) {
            const height: any = stars_1_2.clientHeight + navEl.clientHeight;
            newCoordY_stars_1_2 = -parseFloat(height);
        }

        if (newCoordY_stars_2_2 > window.innerHeight) {
            const height: any = stars_2_2.clientHeight + navEl.clientHeight;
            newCoordY_stars_2_2 = -parseFloat(height);
        }

        if (newCoordY_Bg_sprite_1 > window.innerHeight) {
            const heightCoef: number = randomNumberBetween(2, 10);
            const widthCoef: number = randomNumberBetween(-0.5, 0.2);

            let offset: number = 0;
            if (widthCoef >= -0.1) {
                offset = bg_sprite_1.clientWidth / 2;
            }

            const height: any = heightCoef * navEl.clientHeight;
            const width: any = widthCoef * navEl.clientWidth - offset;

            newCoordX_Bg_sprite_1 = parseFloat(width);
            newCoordY_Bg_sprite_1 = -parseFloat(height);
        }

        if (newCoordY_Bg_sprite_2 > window.innerHeight) {
            const heightCoef: number = randomNumberBetween(2, 10);
            const widthCoef: number = randomNumberBetween(-0.5, 0.5);

            let offset: number = 0;
            if (widthCoef > 0) {
                offset = bg_sprite_2.clientWidth;
            }

            const height: any = heightCoef * navEl.clientHeight;
            const width: any = widthCoef * navEl.clientWidth - offset;

            newCoordX_Bg_sprite_2 = parseFloat(width);
            newCoordY_Bg_sprite_2 = -parseFloat(height);
        }

        coordsStars_1_1.y = newCoordY_stars_1_1;
        coordsStars_2_1.y = newCoordY_stars_2_1;
        coordsStars_1_2.y = newCoordY_stars_1_2;
        coordsStars_2_2.y = newCoordY_stars_2_2;

        coordsBg_sprite_1.x = newCoordX_Bg_sprite_1;
        coordsBg_sprite_2.x = newCoordX_Bg_sprite_2;
        coordsBg_sprite_1.y = newCoordY_Bg_sprite_1;
        coordsBg_sprite_2.y = newCoordY_Bg_sprite_2;

        stars_1_1.setAttribute('style',
            `transform: translate(${coordsStars_1_1.x}px, ${newCoordY_stars_1_1}px)`);
        stars_2_1.setAttribute('style',
            `transform: translate(${coordsStars_2_1.x}px, ${newCoordY_stars_2_1}px)`);
        stars_1_2.setAttribute('style',
            `transform: translate(${coordsStars_1_2.x}px, ${newCoordY_stars_1_2}px)`);
        stars_2_2.setAttribute('style',
            `transform: translate(${coordsStars_2_2.x}px, ${newCoordY_stars_2_2}px)`);

        bg_sprite_1.setAttribute('style',
            `transform: translate(${newCoordX_Bg_sprite_1}px, ${newCoordY_Bg_sprite_1}px)`);
        bg_sprite_2.setAttribute('style',
            `transform: translate(${newCoordX_Bg_sprite_2}px, ${newCoordY_Bg_sprite_2}px)`);
    }

    function bulletLogic(): void {
        const bullets: NodeListOf<Element> = document.querySelectorAll('.bullet');
        for (let i: number = 0; i < bullets.length; i++) {
            const bulletEl: Element = bullets[i];
            const bullet: elObj = createElementObject(bulletEl);

            bullet.coords.y -= 10;

            if (bullet.coords.y < -10) {
                roadEl?.removeChild(bulletEl);
                continue;
            }

            bulletEl.setAttribute('style',
            `transform: translate(${bullet.coords.x}px, ${bullet.coords.y}px)`);
        }
    }

    function enemyLogic(): void {
        const enemies: NodeListOf<Element> = document.querySelectorAll('.enemy');
        for (let i: number = 0; i < enemies.length; i++) {
            const enemyEl: Element = enemies[i];
            const enemy: elObj = createElementObject(enemyEl);

            enemy.coords.y += 3;

            if (enemy.coords.y > road.height + 10) {
                roadEl?.removeChild(enemyEl);
                continue;
            }

            enemyEl.setAttribute('style',
            `transform: translate(${enemy.coords.x}px, ${enemy.coords.y}px)`);

            if (hasCollision(player, enemy) && !invincible) {
                roadEl.setAttribute('style',
                    'background: red');
                setTimeout((): void => {
                    roadEl.setAttribute('style',
                        'background: #19061F');
                    setTimeout((): void => {
                        roadEl.setAttribute('style',
                            'background: red');
                        setTimeout((): void => {
                            roadEl.setAttribute('style',
                                'background: #19061F');
                            setTimeout((): void => {
                                roadEl.setAttribute('style',
                                    'background: red');
                                setTimeout((): void => {
                                    roadEl.setAttribute('style',
                                        'background: #19061F');
                                    }, 50);
                                }, 20);
                            }, 50);
                        }, 20);
                    }, 50);

                invincible = true;
                setTimeout(() => {
                    invincible = false;
                }, invincibleTimer)

                lives--;
                let livesStr: string = ''
                for (let j: number = 1; j <= lives; j++) {
                    livesStr += '&lt3 '
                }

                if (lives == 0) {
                    isDead = true;
                    stopGame();
                    gameOver.setAttribute('style', 'display: initial');

                    fetch('http://127.0.0.1:8000/api/scoreboard/create/', {
                          method: 'POST',
                          body: JSON.stringify({
                             score: score
                          }),
                          headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${token}`
                          }
                    })
                    .then(response => response.text())
                    .then(score => {
                        console.log(score);
                    });
                }

                livesEl.innerHTML = livesStr;
            }

            const bullets: NodeListOf<Element> = document.querySelectorAll('.bullet');
            for (let j: number = 0; j < bullets.length; j++) {
                const bulletEl: Element = bullets[j];
                const bullet: elObj = createElementObject(bulletEl);

                if (hasCollision(bullet, enemy)) {
                    roadEl?.removeChild(enemyEl);
                    roadEl?.removeChild(bulletEl);
                    score += Math.round((road.height - enemy.coords.y) * 10);
                    scoreEl.innerHTML = `${score}`;
                }
            }
        }
    }

    function playerMoveTop(): void {
        const newY: number = player.coords.y - speed;
        if (newY < 0) {
            return;
        }

        player.coords.y = newY;
        playerMove(player.coords.x, player.coords.y);
        player.moveDirection.top = requestAnimationFrame(playerMoveTop);
    }

    function playerMoveBottom(): void {
        const newY: number = player.coords.y + speed;
        if (newY + player.height > road.height) {
            return;
        }

        player.coords.y = newY;
        playerMove(player.coords.x, player.coords.y);
        player.moveDirection.bottom = requestAnimationFrame(playerMoveBottom);
    }

    function playerMoveLeft(): void {
        const newX: number = player.coords.x - speed;
        if (newX < -road.width) {
            return;
        }

        player.coords.x = newX;
        playerMove(player.coords.x, player.coords.y);
        player.moveDirection.left = requestAnimationFrame(playerMoveLeft);
    }

    function playerMoveRight(): void {
        const newX: number = player.coords.x + speed;
        if (newX > -player.width) {
            return;
        }

        player.coords.x = newX;
        playerMove(player.coords.x, player.coords.y);
        player.moveDirection.right = requestAnimationFrame(playerMoveRight);
    }

    function playerMove(x: number, y: number): void {
        playerEl.setAttribute('style',
            `transform: translate(${x}px, ${y}px)`);
    }

    function playerShoot(): void {
        const bullet: HTMLDivElement = document.createElement('div');
        bullet.setAttribute('class', 'bullet')
        bullet.setAttribute('style',
            `transform: translate(${player.coords.x + player.width / 2 - 3}px, ${player.coords.y - 9}px)`);

        roadEl?.appendChild(bullet);
    }

    document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (isPause || isDead) {
            return;
        }

        const code: string = event.code;

        if (code === 'KeyW' && player.moveDirection.top === 0) {
            player.moveDirection.top = requestAnimationFrame(playerMoveTop);
        } else if (code === 'KeyS' && player.moveDirection.bottom === 0) {
            player.moveDirection.bottom = requestAnimationFrame(playerMoveBottom);
        } else if (code === 'KeyA' && player.moveDirection.left === 0) {
            player.moveDirection.left = requestAnimationFrame(playerMoveLeft);
        } else if (code === 'KeyD' && player.moveDirection.right === 0) {
            player.moveDirection.right = requestAnimationFrame(playerMoveRight);
        }

        if (code === 'Space') {
            if (!isShooting) {
                animShoot = requestAnimationFrame(playerShoot);
                shootInterval = setInterval((): void => {
                animShoot = requestAnimationFrame(playerShoot);
                }, 100);
                isShooting = true;
            }
        }
    })

    document.addEventListener('keyup', (event: KeyboardEvent) => {
        const code: string = event.code;

        if (code === 'KeyW') {
            cancelAnimationFrame(player.moveDirection.top);
            player.moveDirection.top = 0;
        } else if (code === 'KeyS') {
            cancelAnimationFrame(player.moveDirection.bottom);
            player.moveDirection.bottom = 0;
        } else if (code === 'KeyA') {
            cancelAnimationFrame(player.moveDirection.left);
            player.moveDirection.left = 0;
        } else if (code === 'KeyD') {
            cancelAnimationFrame(player.moveDirection.right);
            player.moveDirection.right = 0;
        }

        if (code === 'Space') {
            cancelAnimationFrame(animShoot);
            clearInterval(shootInterval);
            isShooting = false;
        }
    })

    document.addEventListener("visibilitychange", function(): void{
        isWorking = !(document.hidden || window.onblur);
        if (!isWorking && !isDead) {
            stopGame();
            pauseButton.children[0].setAttribute('style', 'display: none');
            pauseButton.children[1].setAttribute('style', 'display: initial');
            isPause = !isPause;
        }
    });

    const pauseButton: Element = document.querySelector('#pause_button')!;
    pauseButton.addEventListener('click', () => {
        isPause = !isPause;
        if (isPause && !isDead) {
            stopGame();
            pauseButton.children[0].setAttribute('style', 'display: none');
            pauseButton.children[1].setAttribute('style', 'display: initial');
        } else {
            launchGame();
            pauseButton.children[1].setAttribute('style', 'display: none');
            pauseButton.children[0].setAttribute('style', 'display: initial');
        }
    })

    const retryButton: Element = document.querySelector('#retry_button')!;
    retryButton.addEventListener('click', () => {
        gameOver.setAttribute('style', 'display: none');
        score = 0;
        lives = 3;
        livesEl.innerHTML = '&lt3 &lt3 &lt3';
        isDead = false;
        middle = false;
        beginning = true;
        startGame();
    })
    
    function stopGame(): void {
        cancelAnimationFrame(animationId);
        cancelAnimationFrame(player.moveDirection.top);
        cancelAnimationFrame(player.moveDirection.bottom);
        cancelAnimationFrame(player.moveDirection.left);
        cancelAnimationFrame(player.moveDirection.right);
        cancelAnimationFrame(animSpawnEnemy);
        cancelAnimationFrame(animShoot);
        cancelAnimationFrame(animBullet);
        cancelAnimationFrame(animEnemy);
        clearInterval(enemyInterval);
    }

    function launchGame(): void {
        startGame()
            enemyInterval = setInterval((): void => {
                animSpawnEnemy = requestAnimationFrame(spawnEnemy);
                }, 5000);
    }
}