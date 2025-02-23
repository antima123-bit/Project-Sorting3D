class SortingAlgorithms {
    constructor(array, updateDisplay) {
        this.array = array;
        this.updateDisplay = updateDisplay;
        this.delay = 100;
    }

    setDelay(delay) {
        this.delay = delay;
    }

    async sleep() {
        return new Promise(resolve => setTimeout(resolve, this.delay));
    }

    async bubbleSort() {
        const n = this.array.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (this.array[j] > this.array[j + 1]) {
                    [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
                    await this.updateDisplay(this.array, [j, j + 1]);
                    await this.sleep();
                }
            }
        }
        await this.updateDisplay(this.array, [], true);
    }

    async selectionSort() {
        const n = this.array.length;
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < n; j++) {
                if (this.array[j] < this.array[minIdx]) {
                    minIdx = j;
                }
                await this.updateDisplay(this.array, [i, j]);
                await this.sleep();
            }
            if (minIdx !== i) {
                [this.array[i], this.array[minIdx]] = [this.array[minIdx], this.array[i]];
                await this.updateDisplay(this.array, [i, minIdx]);
            }
        }
        await this.updateDisplay(this.array, [], true);
    }

    async insertionSort() {
        const n = this.array.length;
        for (let i = 1; i < n; i++) {
            let key = this.array[i];
            let j = i - 1;
            while (j >= 0 && this.array[j] > key) {
                this.array[j + 1] = this.array[j];
                await this.updateDisplay(this.array, [j, j + 1]);
                await this.sleep();
                j--;
            }
            this.array[j + 1] = key;
            await this.updateDisplay(this.array, [j + 1]);
        }
        await this.updateDisplay(this.array, [], true);
    }

    async merge(left, mid, right) {
        const n1 = mid - left + 1;
        const n2 = right - mid;
        const L = new Array(n1);
        const R = new Array(n2);

        for (let i = 0; i < n1; i++) L[i] = this.array[left + i];
        for (let j = 0; j < n2; j++) R[j] = this.array[mid + 1 + j];

        let i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                this.array[k] = L[i];
                i++;
            } else {
                this.array[k] = R[j];
                j++;
            }
            await this.updateDisplay(this.array, [k]);
            await this.sleep();
            k++;
        }

        while (i < n1) {
            this.array[k] = L[i];
            await this.updateDisplay(this.array, [k]);
            await this.sleep();
            i++;
            k++;
        }

        while (j < n2) {
            this.array[k] = R[j];
            await this.updateDisplay(this.array, [k]);
            await this.sleep();
            j++;
            k++;
        }
    }

    async mergeSort(left = 0, right = this.array.length - 1) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            await this.mergeSort(left, mid);
            await this.mergeSort(mid + 1, right);
            await this.merge(left, mid, right);
        }
        if (left === 0 && right === this.array.length - 1) {
            await this.updateDisplay(this.array, [], true);
        }
    }

    async partition(low, high) {
        const pivot = this.array[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (this.array[j] < pivot) {
                i++;
                [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
                await this.updateDisplay(this.array, [i, j]);
                await this.sleep();
            }
        }

        [this.array[i + 1], this.array[high]] = [this.array[high], this.array[i + 1]];
        await this.updateDisplay(this.array, [i + 1, high]);
        await this.sleep();
        return i + 1;
    }

    async quickSort(low = 0, high = this.array.length - 1) {
        if (low < high) {
            const pi = await this.partition(low, high);
            await this.quickSort(low, pi - 1);
            await this.quickSort(pi + 1, high);
        }
        if (low === 0 && high === this.array.length - 1) {
            await this.updateDisplay(this.array, [], true);
        }
    }
}
