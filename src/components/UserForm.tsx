import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './UserForm.scss'

export interface IUserData {
    name: string
    username: string
    email: string
    phone: string
    website: string
    address: {
        city: string
        street: string
        zipcode: string
    }
}


const UserForm = () => {

    const [userData, setUserData] = useState<IUserData>()
    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm({
        mode: 'onBlur'
    })


    const { id } = useParams()


    useEffect(() => {
        getUserData()
    }, [])

    async function getUserData() {
        try {
            const response = await axios.get<IUserData>(`https://jsonplaceholder.typicode.com/users/${id}`);
            setUserData(response.data)
        } catch (error) {
            console.log('error: ', error);
        }
    }


    const allowAditing = () => {
        const inputs = document.querySelectorAll('input')
        const textAreas = document.querySelectorAll('textarea')
        const formBtn = (document.querySelector('.user-profile__form__btn') as HTMLButtonElement)

        inputs.forEach((input) => {
            input.readOnly = false
            input.style.color = 'black'
        })
        textAreas.forEach((textarea) => textarea.readOnly = false)
        formBtn.disabled = false
    }

    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        e.target.value = e.target.value
    }

    const onSubmit = (data: any) => {
        console.log('Отправка на сервер: ', JSON.stringify(data))
    }

    return <div className='user-profile'>
        <div className='user-profile__header'>
            <p className='user-profile__title'>Профиль пользователя</p>
            <button className="user-profile__btn btn" onClick={allowAditing}>Редактировать</button>
        </div>

        {userData &&
            <>
                <form onSubmit={handleSubmit(onSubmit)} className='user-profile__form' id='user-form'>
                    <label htmlFor='name'>Name</label>
                    <input {...register('name', {
                        required: true,
                        value: userData?.name,
                        pattern: {
                            value: /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
                            message: 'Введите имя, без символов и чисел',
                        }
                    })} className={errors.name && "invalid"} type="text" readOnly ></input>
                    <label htmlFor='user-name'>User name</label>
                    <input {...register('userName', {
                        required: true,
                        value: userData?.username,
                        pattern: {
                            value: /^[\S]+$/,
                            message: 'Не используйте пробелы',
                        }
                    })} className={errors.userName && "invalid"} type="text" id='user-name' readOnly ></input>
                    <label htmlFor='e-mail'>E-mail</label>
                    <input {...register('email', {
                        required: true,
                        value: userData?.email,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                            message: 'Введите email',
                        }
                    })} className={errors.email && "invalid"} type="text" id='e-mail' readOnly></input>
                    <label htmlFor='street'>Street</label>
                    <input {...register('street', {
                        required: true,
                        value: userData?.address.street,
                    })} className={errors.street && "invalid"} type="text" id='street' readOnly></input>
                    <label htmlFor='city'>City</label>
                    <input {...register('city', {
                        required: true,
                        value: userData?.address.city,
                    })} className={errors.city && "invalid"} type="text" id='city' readOnly></input>
                    <label htmlFor='zip-code'>Zip code</label>
                    <input {...register('zipCode', {
                        required: true,
                        value: userData?.address.zipcode,
                        pattern: {
                            value: /^\d{5}(?:[-\s]\d{4})?$/,
                            message: 'Введите zip code',
                        }
                    })} className={errors.zipCode && "invalid"} type="text" id='zip-code' readOnly></input>
                    <label htmlFor='phone'>Phone</label>
                    <input {...register('phone', {
                        required: true,
                        value: userData?.phone,
                        pattern: {
                            value: /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,
                            message: 'Введите номер телефона',
                        }
                    })} className={errors.phone && "invalid"} type="text" id='phone' readOnly></input>
                    <label htmlFor='website'>Website</label>
                    <input {...register('website', {
                        required: true,
                        value: userData?.website,
                        pattern: {
                            value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm,
                            message: 'Введите название сайта',
                        }
                    })} className={errors.website && "invalid"} type="text" id='website' readOnly></input>
                    <label htmlFor='comment'>Comment</label>
                    <textarea {...register('comment')} id='comment' readOnly></textarea>
                </form>

                <button className='user-profile__form__btn btn' type="submit" form='user-form' disabled >Отправить</button>
            </>
        }
    </div>;
};

export default UserForm;
