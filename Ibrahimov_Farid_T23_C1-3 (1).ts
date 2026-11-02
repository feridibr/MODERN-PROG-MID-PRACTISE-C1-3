// MIDTERM C1-3 · Generics: keep the relationship between types                    (about 20 min)
//
// Lecture 2, slide 17 and Lab 1 file 03. The three helpers below use  unknown , so callers lose every type:
// the result of  longestOr(["a", "bb"], "")  is  unknown , not  string .
// Make each function generic so that the output type follows the input type, then write the body.
//
//   Task 1  longestOr(xs, fallback)   the element with the greatest  .length  (first one on a tie),
//                                     or  fallback  for an empty list. It must REJECT elements that have
//                                     no  length  (numbers): use a constraint.
//   Task 2  maxBy(xs, score)          the element with the highest  score(x)  (first one on a tie),
//                                     or  undefined  for an empty list. The type must say "may be undefined".
//   Task 3  groupBy(xs, key)          a  Map  from  key(x)  to the list of elements with that key,
//                                     keys in first-seen order, elements in input order.
//
// The read-only tests contain compile-time checks: they fail while the types are not precise enough.
// Rules: no  any , no  as , no  ! , no  @ts-ignore . The tests below the editor are read-only.
// Grading also uses hidden tests of the same kind: do not hard-code answers for the visible inputs.

interface User {
  name: string;
  age: number;
  city: string;
}

const users: User[] = [
  { name: "Aysel", age: 24, city: "Baku" },
  { name: "Murad", age: 31, city: "Ganja" },
  { name: "Leyla", age: 31, city: "Baku" },
  { name: "Elvin", age: 19, city: "Sumgait" },
];

// TASK 1
function longestOr<T extends { length: number }>(
  xs: T[],
  fallback: T
): T {
  let best = fallback;
  let found = false;

  for (const x of xs) {
    if (!found || x.length > best.length) {
      best = x;
      found = true;
    }
  }

  return best;
}

// TASK 2
function maxBy<T>(
  xs: T[],
  score: (x: T) => number
): T | undefined {
  let best: T | undefined = undefined;
  let bestScore = -Infinity;
  let found = false;

  for (const x of xs) {
    const currentScore = score(x);

    if (!found || currentScore > bestScore) {
      best = x;
      bestScore = currentScore;
      found = true;
    }
  }

  return best;
}

// TASK 3
function groupBy<T, K>(
  xs: T[],
  key: (x: T) => K
): Map<K, T[]> {
  const result = new Map<K, T[]>();

  for (const x of xs) {
    const k = key(x);
    const group = result.get(k);

    if (group) {
      group.push(x);
    } else {
      result.set(k, [x]);
    }
  }

  return result;
}
