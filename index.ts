export interface HKT {
    readonly _A?: unknown;
    readonly _type?: unknown;
}

export type Kind<F extends HKT, A> = (F & { _A: A })['_type'];

export interface ArrayKind extends HKT {
    readonly _type: Array<this['_A']>;
}

export type NumArray = Kind<ArrayKind, number>; //=> number[]

export interface Functor<F extends HKT> {
    readonly map: <A, B>(self: Kind<F, A>, f: (a: A) => B) => Kind<F, B>
}

export const stringify = <F extends HKT> (
    T: Functor<F>
) => (
    self: Kind<F, number>
): Kind<F, string> => {
    return T.map(self, n => `${n}`)
}

export const ArrayFunctor: Functor<ArrayKind> = {
    map: (self, f) => self.map(f)
}

export const stringifyNumArray = stringify(ArrayFunctor);

console.log(stringifyNumArray([1, 2, 3])) // => ['1', '2', '3']
