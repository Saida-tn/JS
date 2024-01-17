const FOREST_HEIGHT = 10;
const FOREST_WIDTH = 3;
const INITIAL_CELLS = [
    [9, 1],
    [0, 0],
];
const GREEN = 'o';
const ON_FIRE = 'F';
const BURNED = 'X';
const PROBABILITY = 0.5;
const initializeForest = (h, w, init) => {
    [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    const array = Array.from(Array(h), () => new Array(w).fill(GREEN));
    init.forEach(p => {
        array[p[0]][p[1]] = ON_FIRE;
    });
    return array;
};

const FOREST = initializeForest(FOREST_HEIGHT, FOREST_WIDTH, INITIAL_CELLS);

const propaginate = (point, probability) => {
    console.log('point:', point);
    console.log('FOREST:', FOREST);
    FOREST[point[0]][point[1]] = BURNED;

    // point "point" will be burned
    // TOP
    const ableToGoToTop = point[0] > 0; //true
    if (ableToGoToTop) {
        const topPoint = [point[0] - 1, point[1]]; // FOREST[0][1]
        const isTopPointGreen = FOREST[point[0] - 1][point[1]] === GREEN;
        const willPropaginateToTop =
            ableToGoToTop &&
            (Math.random() < probability ? true : false) &&
            isTopPointGreen;
        if (willPropaginateToTop) {
            FOREST[topPoint[0]][topPoint[1]] = ON_FIRE;
            propaginate(topPoint, probability);
        }
    }

    // RIGHT
    const ableToGoToRight = point[1] < FOREST_WIDTH - 1;
    if (ableToGoToRight) {
        const rightPoint = [point[0], point[1] + 1];
        const isRightPointGreen = FOREST[rightPoint[0]][rightPoint[1]] === GREEN;
        const willPropaginateToRight =
            ableToGoToRight &&
            (Math.random() < probability ? true : false) &&
            isRightPointGreen;

        if (willPropaginateToRight) {
            FOREST[rightPoint[0]][rightPoint[1]] = ON_FIRE;
            propaginate(rightPoint, probability);
        }
    }

    //LEFT
    const ableToGoToLeft = point[1] > 0;
    if (ableToGoToLeft) {
        const leftPoint = [point[0], point[1] - 1];
        const isLeftPointGreen = FOREST[leftPoint[0]][leftPoint[1]] === GREEN;
        const willPropaginateToLeft =
            ableToGoToLeft &&
            (Math.random() < probability ? true : false) &&
            isLeftPointGreen;
        if (willPropaginateToLeft) {
            FOREST[leftPoint[0]][leftPoint[1]] = ON_FIRE;
            propaginate(leftPoint, probability);
        }
    }

    // BOTTOM
    const ableToGoToBottom = point[0] < FOREST_HEIGHT - 1;
    if (ableToGoToBottom) {
        const bottomPoint = [point[0] + 1, point[1]];
        const isBottomPointGreen = FOREST[bottomPoint[0]][bottomPoint[1]] === GREEN;
        const willPropaginateToBottom =
            ableToGoToBottom &&
            (Math.random() < probability ? true : false) &&
            isBottomPointGreen;
        if (willPropaginateToBottom) {
            FOREST[bottomPoint[0]][bottomPoint[1]] = ON_FIRE;
            propaginate(bottomPoint, probability);
        }
    }
};

INITIAL_CELLS.forEach(cell => propaginate(cell, PROBABILITY));
console.log('FOREST:', FOREST);