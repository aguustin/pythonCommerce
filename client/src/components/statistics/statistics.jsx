import './statistics.css';
import {Chart as ChartJS} from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import {Bar} from "react-chartjs-2";
import profitsImg from '../../assets/profits.png';
import lossesImg from '../../assets/losses.png';
import stocksImg from '../../assets/stock.png';
import salesImg from '../../assets/sale-tag.png';
import ProductsContext from '../../context/productsContext';
import { useContext, useEffect, useState } from 'react';

const Statistics = () => {
    const {products, setProducts} = useContext(ProductsContext)
    const [profitsStats, setProfitsStats] = useState()
    const [totalProfits, settotalProfits] = useState(0)
    const [lossesStats, setLossesStats] = useState()
    const [totalLosses, settotalLosses] = useState(0)
    const [stockStats, setStockStats] = useState()
    const [totalStock, settotalStock] = useState(0)
    const [salesStats, setSalesStats] = useState()
    const [totalSales, settotalSales] = useState(0)
    const [buys, setBuys] = useState()

            useEffect(() => {
                fetch('http://127.0.0.1:8000/getAllProducts/') //  fetch('https://fakestoreapi.com/products 'http://127.0.0.1:8000/getAllProducts/'')
                .then(res=>res.json())
                .then(json=>setProducts(json));
                // eslint-disable-next-line react-hooks/exhaustive-deps
                fetch('http://127.0.0.1:8000/getBuys/')
                .then(res=>res.json())
                .then(json=>setBuys(json))
            // eslint-disable-next-line react-hooks/exhaustive-deps
            },[])
            console.log(buys)
            useEffect(() => {
                const profitsArray = products.map(product => Math.round(product.profits));
                setProfitsStats(profitsArray);
                const totalProfits = profitsArray.reduce((acc, profit) => acc + profit, 0);
                settotalProfits(totalProfits);

                const lossesArray = products.map(product => Math.round(product.losses));
                setLossesStats(lossesArray);
                const totalLosses = lossesArray.reduce((acumulator, losses) => acumulator + losses, 0)
                settotalLosses(totalLosses)

                const stockArray = products.map(product => product.quantity)
                setStockStats(stockArray)
                const totalStockArray = stockArray.reduce((acumulator, product) => acumulator + product, 0)
                settotalStock(totalStockArray)

                const salesArray = products.map(product => product.total_sales)
                setSalesStats(salesArray)
                const totalSalesArray = salesArray.reduce((acumulator, product) => acumulator + product, 0)
                settotalSales(totalSalesArray)
            }, [products])
    
    ChartJS.register(CategoryScale);

    return(
        <>
        <div className='statistics'>
            <nav className="side-nav">
                <ul>
                    <li><button>Profits</button></li>
                    <li><button>Losses</button></li>
                    <li><button>Stock</button></li>
                    <li><button>Sales History</button></li>
                </ul>
            </nav>
            <div className="statistics-container">
                <section className='general-statistics'>
                    <div className='totals'>
                        <div>
                            <label>Total Profits</label>
                            <img src={profitsImg} alt=""></img>
                        </div>
                        <h3>$ {totalProfits}</h3>
                    </div>
                    <div className='totals'>
                        <div>
                            <label>Total Losses</label>
                            <img src={lossesImg} alt=""></img>
                        </div>
                        <h3>$ {totalLosses}</h3>
                    </div>
                    <div className='totals'>
                        <div>
                            <label>Total Stocks</label>
                            <img src={stocksImg} alt=""></img>
                        </div>
                        <h3>{totalStock}</h3>
                    </div>
                    <div className='totals'>
                        <div>
                            <label>Total Sales</label>
                            <img src={salesImg} alt=""></img>
                        </div>
                        <h3>{totalSales}</h3>
                    </div>
                </section>
                <section className='chart-recents-sales-container'>
                    <div className='chart'>
                        <Bar
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                                datasets: [
                                    {
                                        label: "Profits",
                                        data: profitsStats,
                                        borderColor: '#36A2EB',
                                        backgroundColor: '#5afd68',
                                    },
                                    {
                                        label: "Losses",
                                        data: lossesStats,
                                        borderColor: '#36A2EB',
                                        backgroundColor: '#ff6464',
                                    },
                                    {
                                        label: "Stock",
                                        data: stockStats,
                                        borderColor: '#36A2EB',
                                        backgroundColor: '#649aff',
                                    },
                                    {
                                        label: "Sales",
                                        data: salesStats,
                                        borderColor: '#36A2EB',
                                        backgroundColor: '#ff64b9',
                                    }
                                ]  
                            }}
                         />
                    </div>
                    <div className='recents-sales'>
                        <div>
                            <label>Recent Sales</label>
                            <p>You made 265 sales this month.</p>
                        </div>
                        <ul>
                            <li>
                                <div>
                                    <img src="" alt=""></img>
                                    <div>
                                        <label>Agustin Molé</label>
                                        <p>agustin.molee@gmail.com</p>
                                    </div>  
                                </div>
                            </li>
                            <li>
                                <div>
                                    <img src="" alt=""></img>
                                    <div>
                                        <label>Agustin Molé</label>
                                        <p>agustin.molee@gmail.com</p>
                                    </div>  
                                </div>
                            </li>
                            <li>
                                <div>
                                    <img src="" alt=""></img>
                                    <div>
                                        <label>Agustin Molé</label>
                                        <p>agustin.molee@gmail.com</p>
                                    </div>  
                                </div>
                            </li>
                            <li>
                                <div>
                                    <img src="" alt=""></img>
                                    <div>
                                        <label>Agustin Molé</label>
                                        <p>agustin.molee@gmail.com</p>
                                    </div>  
                                </div>
                            </li>
                            <li>
                                <div>
                                    <img src="" alt=""></img>
                                    <div>
                                        <label>Agustin Molé</label>
                                        <p>agustin.molee@gmail.com</p>
                                    </div>  
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
        </>
    )
}

export default Statistics;