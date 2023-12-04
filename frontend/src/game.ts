export function game(): void {
    let isPause: boolean = false;
    let animationId: number;

    let isShooting: boolean = false;
    let shootInterval: number;
    let animShoot: number;

    let speed: number = 4;

    const nav: Element = document.querySelector('#nav')!;

    const road: Element = document.querySelector('#road')!;
    const roadWidth: number = road.clientWidth;
    const roadHeight = road.clientHeight;

    const player: Element = document.querySelector('#player')!;
    const playerWidth: number = player.clientWidth;
    const playerHeight: number = player.clientHeight;
    const playerCoords: {x: number, y: number} = getCoords(player);
    const playerMoveDirection: {top: number, bottom: number, left: number, right: number} = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    const stars: NodeListOf<Element> = document.querySelectorAll('.stars')!;
    const stars_1_1: Element = stars[0];
    const stars_2_1: Element = stars[1];
    const stars_1_2: Element = stars[2];
    const stars_2_2: Element = stars[3];
    const coordsStars_1_1: {x: number, y: number} = getCoords(stars_1_1);
    const coordsStars_2_1: {x: number, y: number} = getCoords(stars_2_1);
    const coordsStars_1_2: {x: number, y: number} = getCoords(stars_1_2);
    const coordsStars_2_2: {x: number, y: number} = getCoords(stars_2_2);

    const bg_sprites: NodeListOf<Element> = document.querySelectorAll('.bg_sprite')!;
    const bg_sprite_1: Element = bg_sprites[0];
    const bg_sprite_2: Element = bg_sprites[1];
    const coordsBg_sprite_1: {x: number, y: number} = getCoords(bg_sprite_1)
    const coordsBg_sprite_2: {x: number, y: number} = getCoords(bg_sprite_2)

    animationId = requestAnimationFrame(startGame);

    function randomNumberBetween(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    function getCoords(el: Element): {x: number, y: number} {
        const matrix = window.getComputedStyle(el).transform.split(', ');
        const x: number = parseFloat(matrix[matrix.length - 2]);
        const y: number = parseFloat(matrix[matrix.length - 1]);

        return {x: x, y: y};
    }

    function startGame(): void {
        backgroundAnimation();
        bulletLogic();

        animationId = requestAnimationFrame(startGame);
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
            const height: any = stars_1_1.clientHeight + nav.clientHeight;
            newCoordY_stars_1_1 = -parseFloat(height);
        }

        if (newCoordY_stars_2_1 > window.innerHeight) {
            const height: any = stars_2_1.clientHeight + nav.clientHeight;
            newCoordY_stars_2_1 = -parseFloat(height);
        }

        if (newCoordY_stars_1_2 > window.innerHeight) {
            const height: any = stars_1_2.clientHeight + nav.clientHeight;
            newCoordY_stars_1_2 = -parseFloat(height);
        }

        if (newCoordY_stars_2_2 > window.innerHeight) {
            const height: any = stars_2_2.clientHeight + nav.clientHeight;
            newCoordY_stars_2_2 = -parseFloat(height);
        }

        if (newCoordY_Bg_sprite_1 > window.innerHeight) {
            const heightCoef: number = randomNumberBetween(2, 10);
            const widthCoef: number = randomNumberBetween(-0.5, 0.2);

            let offset: number = 0;
            if (widthCoef >= -0.1) {
                offset = bg_sprite_1.clientWidth / 2;
            }

            const height: any = heightCoef * nav.clientHeight;
            const width: any = widthCoef * nav.clientWidth - offset;

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

            const height: any = heightCoef * nav.clientHeight;
            const width: any = widthCoef * nav.clientWidth - offset;

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
            const bullet: Element = bullets[i];

            const bulletCoords: {x: number, y: number} = getCoords(bullets[i]);
            let newCoordY: number = bulletCoords.y - 10;

            if (newCoordY < -10) {
                road?.removeChild(bullet);
            }

            bulletCoords.y = newCoordY;

            bullet.setAttribute('style', 'position: absolute; ' +
            'width: 6px; ' +
            'height: 18px; ' +
            'background: white; ' +
            `transform: translate(${bulletCoords.x}px, ${newCoordY}px)`);
        }
    }

    function playerMoveTop(): void {
        const newY: number = playerCoords.y - speed;
        if (newY < 0) {
            return;
        }

        playerCoords.y = newY;
        playerMove(playerCoords.x, playerCoords.y);
        playerMoveDirection.top = requestAnimationFrame(playerMoveTop);
    }

    function playerMoveBottom(): void {
        const newY: number = playerCoords.y + speed;
        if (newY + playerHeight > roadHeight) {
            return;
        }

        playerCoords.y = newY;
        playerMove(playerCoords.x, playerCoords.y);
        playerMoveDirection.bottom = requestAnimationFrame(playerMoveBottom);
    }

    function playerMoveLeft(): void {
        const newX: number = playerCoords.x - speed;
        if (newX < -roadWidth / 2 + playerWidth / 2) {
            return;
        }

        playerCoords.x = newX;
        playerMove(playerCoords.x, playerCoords.y);
        playerMoveDirection.left = requestAnimationFrame(playerMoveLeft);
    }

    function playerMoveRight(): void {
        const newX: number = playerCoords.x + speed;
        if (newX > roadWidth / 2 - playerWidth / 2) {
            return;
        }

        playerCoords.x = newX;
        playerMove(playerCoords.x, playerCoords.y);
        playerMoveDirection.right = requestAnimationFrame(playerMoveRight);
    }

    function playerMove(x: number, y: number): void {
        player.setAttribute('style',
            `transform: translate(${x}px, ${y}px)`);
    }

    function playerShoot(): void {
        const bullet = document.createElement('div');
        bullet.setAttribute('class', 'bullet')
        bullet.setAttribute('style', 'position: absolute; ' +
            'width: 6px; ' +
            'height: 18px; ' +
            'background: white; ' +
            `transform: translate(${playerCoords.x + roadWidth / 2 - 3}px, ${playerCoords.y - 9}px)`);

        road?.appendChild(bullet);
    }

    document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (isPause) {
            return;
        }

        const code: string = event.code;

        if (code === 'KeyW' && playerMoveDirection.top === 0) {
            playerMoveDirection.top = requestAnimationFrame(playerMoveTop);
        } else if (code === 'KeyS' && playerMoveDirection.bottom === 0) {
            playerMoveDirection.bottom = requestAnimationFrame(playerMoveBottom);
        } else if (code === 'KeyA' && playerMoveDirection.left === 0) {
            playerMoveDirection.left = requestAnimationFrame(playerMoveLeft);
        } else if (code === 'KeyD' && playerMoveDirection.right === 0) {
            playerMoveDirection.right = requestAnimationFrame(playerMoveRight);
        }

        if (code === 'Space') {
            if (!isShooting) {
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
            cancelAnimationFrame(playerMoveDirection.top);
            playerMoveDirection.top = 0;
        } else if (code === 'KeyS') {
            cancelAnimationFrame(playerMoveDirection.bottom);
            playerMoveDirection.bottom = 0;
        } else if (code === 'KeyA') {
            cancelAnimationFrame(playerMoveDirection.left);
            playerMoveDirection.left = 0;
        } else if (code === 'KeyD') {
            cancelAnimationFrame(playerMoveDirection.right);
            playerMoveDirection.right = 0;
        }

        if (code === 'Space') {
            cancelAnimationFrame(animShoot);
            clearInterval(shootInterval);
            isShooting = false;
        }
    })

    const pauseButton: Element = document.querySelector('#pause_button')!;
    pauseButton.addEventListener('click', () => {
        isPause = !isPause;
        if (isPause) {
            cancelAnimationFrame(animationId);
            cancelAnimationFrame(playerMoveDirection.top);
            cancelAnimationFrame(playerMoveDirection.bottom);
            cancelAnimationFrame(playerMoveDirection.left);
            cancelAnimationFrame(playerMoveDirection.right);
            cancelAnimationFrame(animShoot);
            pauseButton.children[0].setAttribute('style', 'display: none');
            pauseButton.children[1].setAttribute('style', 'display: initial');
        } else {
            startGame()
            pauseButton.children[1].setAttribute('style', 'display: none');
            pauseButton.children[0].setAttribute('style', 'display: initial');
        }
    })
}