
import './InfoCard.css';
export const InfoCard = ({name, img_src, count}) => {

    return (
        <div className="info-card-container">
            <div className="info-header">
                <h3>{name}</h3>
                <img src={img_src}/>
            </div>
            <div className="info-footer">
                {count}
            </div>
        </div>
    )
}