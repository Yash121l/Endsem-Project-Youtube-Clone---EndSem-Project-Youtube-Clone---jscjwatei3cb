import { useParams } from "react-router-dom";
import './details.css';

function Details({ token }) {
    let datas = {};
    function setData(e) {
        datas = e;
    }

    const { id } = useParams();
    const response = () => {
        fetch(`https://academics.newtonschool.co/api/v1/ottx/show/${id}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'projectID': 'jscjwatei3cb',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data)
                console.log(datas)
                return (
                    <>
                        <h1>{data.data.title}</h1>
                    </>
                )
            })
    };

    return (
        <>
            {response()}
        </>
    )
}

export default Details;
