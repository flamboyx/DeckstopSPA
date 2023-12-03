export function game(): void {
    let isPause: boolean = false;
    let animationId: number;

    let speed: number = 3;

    const nav: Element = document.querySelector('#nav')!;
    const player: Element = document.querySelector('#player')!;

    const stars: NodeListOf<Element> = document.querySelectorAll('.stars')!;
    const stars_1_1: Element = stars[0];
    const stars_2_1: Element = stars[1];
    const stars_1_2: Element = stars[2];
    const stars_2_2: Element = stars[3];

    const bg_sprites: NodeListOf<Element> = document.querySelectorAll('.bg_sprite')!;
    const bg_sprite_1: Element = bg_sprites[0];
    const bg_sprite_2: Element = bg_sprites[1];

    const coordsStars_1_1: {x: number, y: number} = getCoords(stars_1_1);
    const coordsStars_2_1: {x: number, y: number} = getCoords(stars_2_1);
    const coordsStars_1_2: {x: number, y: number} = getCoords(stars_1_2);
    const coordsStars_2_2: {x: number, y: number} = getCoords(stars_2_2);

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
            const widthCoef: number = randomNumberBetween(-0.5, 0.5);

            let offset: number = 0;
            if (widthCoef > 0) {
                offset = bg_sprite_1.clientWidth;
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

    const pauseButton: Element = document.querySelector('#pause_button')!;
    pauseButton.addEventListener('click', () => {
        isPause = !isPause;
        if (isPause) {
            cancelAnimationFrame(animationId);
            pauseButton.children[0].setAttribute('style', 'display: none');
            pauseButton.children[1].setAttribute('style', 'display: initial');
        } else {
            startGame()
            pauseButton.children[1].setAttribute('style', 'display: none');
            pauseButton.children[0].setAttribute('style', 'display: initial');
        }
    })
}