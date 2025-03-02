/**
 * Sorting Algorithms for Visualizer
 * Author: Antima Mishra
 * Date: March 2025
 * Custom implementation of sorting with animations
 */
export const bubbleSort = async (array, compare, swap) => {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      await compare(j, j + 1);
      if (array[j] > array[j + 1]) {
        await swap(array, j, j + 1);
      }
    }
  }
};

export const selectionSort = async (array, compare, swap) => {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      await compare(minIdx, j);
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      await swap(array, i, minIdx);
    }
  }
};

export const insertionSort = async (array, compare, swap) => {
  const n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      await compare(j, j + 1);
      array[j + 1] = array[j];
      j = j - 1;
    }
    array[j + 1] = key;
  }
};

export const mergeSort = async (array, compare, swap, markSorted, setArray) => {
  const merge = async (left, mid, right) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = array.slice(left, mid + 1);
    const R = array.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
      await compare(left + i, mid + 1 + j);
      if (L[i] <= R[j]) {
        array[k] = L[i];
        i++;
      } else {
        array[k] = R[j];
        j++;
      }
      setArray([...array]);
      k++;
    }

    while (i < n1) {
      array[k] = L[i];
      setArray([...array]);
      i++;
      k++;
    }

    while (j < n2) {
      array[k] = R[j];
      setArray([...array]);
      j++;
      k++;
    }
  };

  const mergeSortHelper = async (left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSortHelper(left, mid);
      await mergeSortHelper(mid + 1, right);
      await merge(left, mid, right);
    }
  };

  await mergeSortHelper(0, array.length - 1);
};

export const quickSort = async (array, compare, swap, markSorted, setArray) => {
  const partition = async (low, high) => {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      await compare(j, high);
      if (array[j] < pivot) {
        i++;
        await swap(array, i, j);
      }
    }
    await swap(array, i + 1, high);
    return i + 1;
  };

  const quickSortHelper = async (low, high) => {
    if (low < high) {
      const pi = await partition(low, high);
      await quickSortHelper(low, pi - 1);
      await quickSortHelper(pi + 1, high);
    }
  };

  await quickSortHelper(0, array.length - 1);
};
