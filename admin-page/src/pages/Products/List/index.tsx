import { Carousel, Card } from 'components'
import React, { useState } from 'react'
// import { Card } from '@dev/components'
import { isMobile } from 'react-device-detect';
import './index.css';

export const Products = () => {
    const [products, setProducts] = useState([
        {
            name: '123',
            title: 'Bán nhà hẻm 260 Phan Anh, dt 4x11m, đúc 1 tấm, giá 4.2 tỷ ( TL nhẹ), P. Tân Thới Hoà, Quận Tân Phú',
            image: 'https://static.hara.vn/1/200000008967/5c9ebe0e86194d5abebb57a38ced2853.jpeg',
            description: 'Noteworthy technology acquisitions 2021',
            landAreaSquare: '70m2',
            location: 'Hồ Chí Minh'
        },
        {
            name: '456',
            title: 'Bán nhà 160m2 4 lầu KDC sông giồng tại quận 2',
            description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
            landAreaSquare: '70m2',
        },
        { name: '789' },
        { name: '2131' },
    ])

    return (
        <div className='container product-page'>
            <div className=''>
                <Carousel />
            </div>

            <div className='section'>Bất động sản nổi bật</div>
            <div className={`row gy-3 no-gutters' ${isMobile ? 'gx-0' : 'gx-2'}`}>
                {
                    products && products.length > 0
                        ? products.map(product => {
                            return <div className={`col-${isMobile ? 'md-12' : 'md-4'}`}>
                                <Card
                                    title={product.title}
                                    image={product.image}
                                    description={product.description}
                                    location={product.location}
                                    landAreaSquare={product.landAreaSquare}
                                />
                            </div>
                        })
                        : <></>
                }
            </div>
        </div>
    )
}
