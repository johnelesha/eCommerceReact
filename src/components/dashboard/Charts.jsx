import React from 'react'
import UsersByCityChart from './charts/userCharts/UsersByCityChart.jsx'
import UsersWishlistChart from './charts/userCharts/UsersWishlistChart.jsx'
import ProductsRatingChart from './charts/productCharts/ProductsRatingChart.jsx'
import ProductsSalesChart from './charts/productCharts/ProductsSalesChart.jsx'
import OrderTotalAmountChart from './charts/orderCharts/OrderTotalAmountChart.jsx'

const Charts = () => {
    return (
        <div className="flex flex-col">
            <h1 className="main-title">Users Charts</h1>

            <div className="flex  flex-wrap justify-between my-5 gap-6 ">
                <UsersByCityChart />
                <UsersWishlistChart />
            </div>

            <h1 className="main-title">Products Charts</h1>
            <div className="flex  flex-wrap justify-between my-5   gap-6">
                <ProductsRatingChart />
                <ProductsSalesChart />
            </div>

            <h1 className="main-title">Orders Charts</h1>
            <div className="flex  flex-wrap justify-between my-5   gap-6">
                <OrderTotalAmountChart />
            </div>

        </div>
    )
}

export default Charts