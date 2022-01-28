import React, { FC } from 'react';
import './UsersList.scss';
import '../preloaders/preloader.scss'
import { Routes, Route, Link } from 'react-router-dom';

export interface IUser {
    name: string
    address: {
        city: string
    }
    company: {
        name: string
    }

}

export interface IUsersListFC {
    users: IUser[]
    loading?: boolean
}


const UsersList: FC<IUsersListFC> = ({ users, loading }) => {


    return <div className='users-list'>
        <div className='users-list__title'>Список пользователей</div>
        {loading && <div className='users-list__loading loader'>Загрузка списка пользователей...</div>}
        {users?.map((user: any) => (
            <div key={user.id} className="user-card">
                <p><span className="user-card__span">ФИО:</span>{user.name}</p>
                <p><span className="user-card__span">город:</span>{user.address.city}</p>
                <p><span className="user-card__span">компания:</span>{user.company.name}</p>
                <Link to={`/${user.id}`} className='user-card__details'>Подробнее</Link>
            </div>
        )
        )}
    </div>;
}

export default UsersList;


