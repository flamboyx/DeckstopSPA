export function game(): void {
    let isPause: boolean = false;
    let animationId: number;

    let speed: number = 3;

    const player: Element = document.querySelector('#player')!;
    const stars: NodeListOf<Element> = document.querySelectorAll('.stars')!;
    const stars_1_1: Element = stars[0];
    const stars_2_1: Element = stars[1];
    const stars_1_2: Element = stars[2];
    const stars_2_2: Element = stars[3];

    const coordsStars_1_1: {x: number, y: number} = getCoords(stars_1_1);
    const coordsStars_2_1: {x: number, y: number} = getCoords(stars_2_1);
    const coordsStars_1_2: {x: number, y: number} = getCoords(stars_1_2);
    const coordsStars_2_2: {x: number, y: number} = getCoords(stars_2_2);

    animationId = requestAnimationFrame(startGame);

    function getCoords(el: Element): {x: number, y: number} {
        const matrix = window.getComputedStyle(el).transform.split(', ');
        const x: number = parseFloat(matrix[matrix.length - 2]);
        const y: number = parseFloat(matrix[matrix.length - 1]);

        return {x: x, y: y};
    }

    function startGame(): void {
        starsAnimation();

        animationId = requestAnimationFrame(startGame);
    }

    function starsAnimation(): void {
        let newCoordY_stars_1_1: number = coordsStars_1_1.y + speed / 3;
        let newCoordY_stars_2_1: number = coordsStars_2_1.y + speed / 6;
        let newCoordY_stars_1_2: number = coordsStars_1_2.y + speed / 3;
        let newCoordY_stars_2_2: number = coordsStars_2_2.y + speed / 6;

        if (newCoordY_stars_1_1 > window.innerHeight) {
            console.log(stars_1_1.clientHeight);
            const height: any = stars_1_1.clientHeight;
            newCoordY_stars_1_1 = -parseFloat(height);
        }

        if (newCoordY_stars_2_1 > window.innerHeight) {
            console.log(stars_2_1.clientHeight);
            const height: any = stars_2_1.clientHeight;
            newCoordY_stars_2_1 = -parseFloat(height);
        }

        if (newCoordY_stars_1_2 > window.innerHeight) {
            console.log(stars_1_2.clientHeight);
            const height: any = stars_1_2.clientHeight;
            newCoordY_stars_1_2 = -parseFloat(height);
        }

        if (newCoordY_stars_2_2 > window.innerHeight) {
            console.log(stars_2_2.clientHeight);
            const height: any = stars_2_2.clientHeight;
            newCoordY_stars_2_2 = -parseFloat(height);
        }

        coordsStars_1_1.y = newCoordY_stars_1_1;
        coordsStars_2_1.y = newCoordY_stars_2_1;
        coordsStars_1_2.y = newCoordY_stars_1_2;
        coordsStars_2_2.y = newCoordY_stars_2_2;
        stars_1_1.setAttribute('style',
            `transform: translate(${coordsStars_1_1.x}px, ${newCoordY_stars_1_1}px)`);
        stars_2_1.setAttribute('style',
            `transform: translate(${coordsStars_2_1.x}px, ${newCoordY_stars_2_1}px)`);
        stars_1_2.setAttribute('style',
            `transform: translate(${coordsStars_1_2.x}px, ${newCoordY_stars_1_2}px)`);
        stars_2_2.setAttribute('style',
            `transform: translate(${coordsStars_2_2.x}px, ${newCoordY_stars_2_2}px)`);
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