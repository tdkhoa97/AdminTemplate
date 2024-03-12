import React, { useState, useEffect } from 'react'
import './index.css'
// interface IProps {
//     image?: string
//     title?: string
//     description?: string
//     location?: string
//     landAreaSquare?: string
// }

enum Unit {
    Million,
    Billion
}
const units = {
    [Unit.Million]: 'triệu',
    [Unit.Billion]: 'tỷ',
}

export const ProductDetail = () => {
    // const { image, title, description, location, landAreaSquare } = props

    const [name, setName] = useState('123')
    const [title, setTitle] = useState('Bán nhà hẻm 260 Phan Anh, dt 4x11m, đúc 1 tấm, giá 4.2 tỷ ( TL nhẹ), P. Tân Thới Hoà, Quận Tân Phú')
    const [image, setImage] = useState('https://static.hara.vn/1/200000008967/5c9ebe0e86194d5abebb57a38ced2853.jpeg')
    const [description, setDescription] = useState('Noteworthy technology acquisitions 2021')
    const [landAreaSquare, setLandAreaSquare] = useState('70m2')
    const [location, setLocation] = useState('Hồ Chí Minh')
    const [price, setPrice] = useState(7.5)
    const [unit, setUnit] = useState(Unit.Billion)
    const [pricePerSquare, setPricePerSquare] = useState()
    const [saleDate, setSaleDate] = useState(new Date())

    return (
        <div className='product-detail'>
            <div className='img-wrapper'>
                <img className="image" src={image} alt="" />
            </div>
            <div className='content'>
                <div>
                    {title}
                </div>
                <div className='price'>
                    <span>{price} {units[unit]}</span>
                    -
                    {pricePerSquare} triệu/m2
                </div>
            </div>
        </div>
    )
}
