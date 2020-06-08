import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { baseURL } from '@/utils/consts'
import './index.scss'

export default () => {
    const [count, setCount] = useState(1)

    const add = () => setCount(count + 1)

    const minus = () => {
        if (count == 1) return
        setCount(count - 1)
    }
    return (
        <Layout>
            <div
                style={{
                    padding: '10px',
                }}>
                <div>
                    <p>You clicked {count} times</p>
                    <div className="btn-flex">
                        <button onClick={add}>加</button>
                        <button onClick={minus}>减</button>
                    </div>
                </div>
                <div style={{
                    padding: "20px"
                }}>
                    <a href={baseURL}>{baseURL}</a>
                </div>
            </div>
        </Layout>
    )
}
