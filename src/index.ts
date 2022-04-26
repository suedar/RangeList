// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

enum RangeBoundaries {
    start = 0,
    end = 1,
}

class RangeList {
    private rangeList: Array<[number, number]>;

    constructor() {
        this.rangeList = new Array();
        // this.rangList = [];
    }

    private static handleException(range: [number, number]): void {
        if (
            !Array.isArray(range) ||
            isNaN(range[RangeBoundaries.start]) || isNaN(range[RangeBoundaries.end])
            || range.length > 2
        ) {
            throw new Error('RangeList requires an array of two numbers as an input!');
        }
    }

    // private rangeList: INewRange[] = [];

    /**
     * Adds a range to the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    public add(range: [number, number]): void {
        RangeList.handleException(range);

        const rangeList = this.rangeList;
        const [rStart, rEnd] = range;
        
        if (rangeList.length === 0) {
            this.rangeList.push(range);
            return;
        }



        for (let i = 0; i < rangeList.length; i++) {

            const [iStart, iEnd] = rangeList[i];
            if (rStart > iEnd) {
                continue;
            }


            if (rStart >= iStart && rEnd <= iEnd) { // nothing change
                return;
            }

            if (rStart <= iStart && iEnd >= rEnd) {
                this.rangeList.splice(i, 1, [rStart, iEnd]);
                return;
            }


            if (rStart <= iEnd) {

                let rangeMin = Math.min(iStart, rStart);
                for (let j = i + 1; j < rangeList.length; j++) {
                    const [iiRangeStart, iiRangeEnd] = rangeList[j];

                    if (iiRangeStart > rEnd) {
                        this.rangeList.splice(i, j - i, [rangeMin, rEnd]);
                        return;
                    }

                    if (iiRangeEnd <= rEnd) {
                        this.rangeList.splice(i, j - i + 1, [rangeMin, rEnd]);
                        return;
                    }

                    if (j === rangeList.length - 1 && iiRangeStart <= rEnd) {
                        this.rangeList.splice(i, j - i + 1, [rangeMin, iiRangeEnd]);
                        return;
                    }

                }

            }

            // no intersection
            if (i === rangeList.length - 1) {
                if (iEnd <= rStart) {
                    this.rangeList.splice(i, 1, [iStart, rEnd]);
                    return
                }
                this.rangeList.push(range);
                return;
            }
            
            const [nStart] = rangeList[i + 1];
            if (rStart > iEnd && rEnd < nStart) {
                this.rangeList.splice(i, 0, range);
                return;
            }

        }

        this.rangeList.push(range);
        
    }


    /**
     * Removes a range from the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
     public remove(range) {
        RangeList.handleException(range);

        const rangeList = this.rangeList;
        const [rStart, rEnd] = range;
        
        if (rangeList.length === 0) {
            return;
        }


        for (let i = 0; i < rangeList.length; i++) {

            const [iStart, iEnd] = rangeList[i];
            if (rStart > iEnd) {
                continue;
            }

            if (rStart > iStart && rEnd < iEnd) {
                this.rangeList.splice(i, 1, [iStart, rStart], [rEnd, iEnd]);
                return;
            }


            if (rStart < iEnd) {

                for (let j = i + 1; j < rangeList.length; j++) {
                    const [iiRangeStart, iiRangeEnd] = rangeList[j];

                    if (rStart <= iStart) {
                        if (rEnd <= iiRangeStart) {
                            this.rangeList.splice(i, j - i + 1);
                            return;
                        }
                        else {
                            this.rangeList.splice(i, j - i + 1, [rEnd, iiRangeEnd]);
                            return;
                        }
                    }
                    else {
                        if (rEnd <= iiRangeStart) {
                            this.rangeList.splice(i, j - i + 1, [iStart, rStart], [rEnd, iiRangeEnd]);
                            return;
                        }
                        else {
                            if (rEnd > iiRangeEnd) {
                                continue;
                            }
                            this.rangeList.splice(i, j - i + 1, [iStart, rStart], [rEnd, iiRangeEnd]);
                            return;
                        }
                    }

                }

            }

            if (i === range.length - 1) {
                if (rStart <= iStart && rEnd > iStart) {
                    this.rangeList.splice(i, 1, [rEnd, iEnd]);
                    return;
                }
            }
            

        }
    }
    
    /**
     * Prints out the list of ranges in the range list
     */
     public print() {
        let output = '';
        for (const item of this.rangeList) {
            output += `[${item[RangeBoundaries.start]}, ${item[RangeBoundaries.end]}) `;
        }
        output = output.trim();
        console.log(output);
        return output;
    }
}

export default RangeList;

const rl = new RangeList();

rl.add([1, 5]);
rl.print();
// Should display: [1, 5)

rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)

rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)

rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)

rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)

rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)

rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [10, 21)

rl.remove([10, 11]);
rl.print();
// Should display: [1, 8) [11, 21)

rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)

rl.remove([3, 19]);
rl.print();
// Should display: [1, 3) [19, 21)