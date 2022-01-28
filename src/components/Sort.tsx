import React, { FC } from 'react';
import './Sort.scss'


export interface IBtnFunctions {
    sortByCity(): void
    sortByCompany(): void
}


const Sort: FC<IBtnFunctions> = ({ sortByCity, sortByCompany }) => {
    return <aside className='users-sort'>
        <p className='users-sort__title'>Сортировка</p>
        <button className='btn btn--sort-by-city' onClick={sortByCity}>по городу</button>
        <button className='btn btn--sort-by-company' onClick={sortByCompany}>по компании</button>
    </aside>;
}

export default Sort;
