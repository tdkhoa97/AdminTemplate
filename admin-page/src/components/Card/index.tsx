import React from 'react'
import { Link } from 'react-router-dom'
import './index.css';
import { Button } from '..';
import { nextIcon, locationIcon } from '../../utils/icon'

interface IProps {
    image?: string
    title?: string
    description?: string
    location?: string
    landAreaSquare?: string
}

export const Card = (props: IProps) => {
    const { image, title, description, location, landAreaSquare } = props

    const renderLocation = () => {
        return <div className='d-flex'>
            <span className='d-flex align-items-center'>Vị trí <span style={{ marginLeft: '4px' }}>{locationIcon(18, 18)}</span>: </span>
            &nbsp;
            <span>{location}</span>
        </div>
    }

    const renderLandArea = () => {
        return <div>
            <span>Diện tích: </span>
            <span>{landAreaSquare}</span>
        </div>
    }

    return (
        <Link to={'/product-detail'} >
            <div className="card bg-white border  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                style={{ height: '500px' }}>
                <div className='d-flex justify-content-center img-wrapper'>
                    <img className="image" src={image} alt="" />
                </div>
                <div className="content-wrapper">
                    <div className="title mb-2 dark:text-white">
                        {title}
                    </div>
                    <div>
                        {location && renderLocation()}
                        {landAreaSquare && renderLandArea()}
                    </div>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {description}
                    </p>
                    <div className='footer'>
                        <Button
                            type='primary'
                            text='Chi tiết'
                            icon={nextIcon()}
                        />
                    </div>
                </div>
            </div>
        </Link>
    )
}
