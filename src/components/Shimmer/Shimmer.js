import Blank from '../../assets/img/blank.jpg';
export const Shimmer = () => {
    return (
        <div className="restraunt-list">
            {
                // Array(10).fill("").map((e, index) => <div key={index} className='shimmer-card' ></div>)

                Array(10).fill("").map((e, index) => (
                    <div className='card' >
                    <img src={Blank} />
                    <div className="restraunt-name"></div>
                    <div className="restraunt-cuisines"></div>
                    <div className="details">
                        <div className="rating"></div>
                        <div></div>
                        <div></div>
                    </div>
                 </div>
                ))
            }
        </div>
    )
}