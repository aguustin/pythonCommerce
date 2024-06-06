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
import { getBuyByIdRequest } from '../api/productsRequest';

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
    const [seeDetails, setSeeDetails] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    let filteredBuys = null;
    
            useEffect(() => {
                fetch('http://127.0.0.1:8000/getAllProducts/') //  fetch('https://fakestoreapi.com/products 'http://127.0.0.1:8000/getAllProducts/'')
                .then(res=>res.json())
                .then(json=>setProducts(json));
                // eslint-disable-next-line react-hooks/exhaustive-deps
                /*fetch('http://127.0.0.1:8000/getBuys/')
                .then(res=>res.json())
                .then(json=>setBuys(json))*/
            // eslint-disable-next-line react-hooks/exhaustive-deps
            },[])
            
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

    const filteredProducts = products.filter(product =>
        new RegExp(searchTerm, 'i').test(product.productName)
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Update search term state
    };

    const onDateFrom = (e) => {
        setDateFrom(e.target.value)
    }

    const onDateTo = (e) => {
        setDateTo(e.target.value)
    }

    const openStatistics = async () => {
        
        document.getElementById("charts").style.position = "fixed";
        document.getElementById("charts").style.top = "80px"
        document.getElementById("charts").style.bottom = "0"
        document.getElementById("charts").style.right = "0"
        document.getElementById("charts").style.left = "16.5vw"
        document.getElementById("charts").style.width = "100%"
        document.getElementById("charts").style.overflowY = "scroll"
        setSeeDetails(true)
        console.log('productos', products)
    }

    const openProductStatistics = async (productId) => {
        const res = await getBuyByIdRequest(productId)
        setBuys(res.data)

        if(document.getElementById("stat").style.height == "90vh"){
            document.getElementById("stat").style.width = "41.40vw"
            document.getElementById("stat").style.height = "38.90vh"
        }else{ 
            document.getElementById("stat").style.width = "80vw"
            document.getElementById("stat").style.height = "90vh"
            document.getElementById("stat").style.transition = "all .5s"
        }
    }

    console.log("details: ", buys)

    const staticsFromDates = (e) => {
        e.preventDefault()
        
        const dateStart = e.target.elements.dateStart.value
        const dateEnd = e.target.elements.dateEnd.value

        if (dateStart && dateEnd && dateStart !== dateEnd) {
            // Filter buys between dateStart and dateEnd inclusive
            filteredBuys = buys.filter(b => b.buy_date >= dateStart && b.buy_date <= dateEnd);
        } else if (dateStart) {
            // Filter buys on dateStart only
            filteredBuys = buys.filter(b => b.buy_date >= dateStart);
        } else if (dateEnd){
            filteredBuys = buys.filter(b => b.buy_date <= dateEnd);
        } else {
            // If no dates are provided, return all buys or handle as needed
            filteredBuys = buys;
        }
    
        console.log('date start: ', dateStart, 'date end: ', dateEnd);
        console.log("filtered buys: ", filteredBuys);

    }
    return(
        <>
        <div className='statistics'>
            <nav className="side-nav">
            <form>
                <input type="text" name="search" value={searchTerm} onChange={handleSearchChange}></input>
            </form>
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
                    <div className="chart" id="charts">
                       {seeDetails
                       ?     
                       <div className='stat-detail'>
                       {filteredProducts.map((p) => {
                            return(
                                <>
                                <div className='stat' id='stat'>
                                <form onSubmit={(e) => staticsFromDates(e)}>
                                    <label htmlFor="start">From:</label>
                                    <input type="date" id="start" name="dateStart" value={dateFrom} min="2020-05-10" max="2024-07-00" onChange={onDateFrom} />
                                    <label htmlFor="start">To:</label>
                                    <input type="date" id="end" name="dateEnd" value={dateTo} min="2020-05-10" max="2024-07-00" onChange={onDateTo} />
                                    <button className='stats-button' type='submit'>Stats</button>
                                </form>
                                <label>{p.productName}</label>
                                <Bar key={p.id} id="abc" onClick={() => openProductStatistics(p.id)}          
                                        data={{
                                            labels: ['January'],
                                            datasets: [
                                                {
                                                    label: "Profits",
                                                    data: [p.profits],
                                                    borderColor: '#36A2EB',
                                                    backgroundColor: '#5afd68',
                                                },
                                                {
                                                    label: "Losses",
                                                    data: [p.losses],
                                                    borderColor: '#36A2EB',
                                                    backgroundColor: '#ff6464',
                                                },
                                                {
                                                    label: "Stock",
                                                    data: [p.quantity],
                                                    borderColor: '#36A2EB',
                                                    backgroundColor: '#649aff',
                                                },
                                                {
                                                    label: "Sales",
                                                    data: [p.sales],
                                                    borderColor: '#36A2EB',
                                                    backgroundColor: '#ff64b9',
                                                    
                                                }
                                            ],
                                            options: {
                                                     scales: {
                                                        y: {
                                                            min: 2,
                                                            max: 1000000,
                                                        }
                                                    }
                                                    }  
                                    
                                        }}
                                        
                                />
                                </div>
                                </>
                            )
                        })}
                         </div>
                       :
                       <Bar
                            data={{
                                labels: ['January'],
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
                       } 
                         
                    <button id="see-details" onClick={() =>openStatistics()}>See details</button>
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