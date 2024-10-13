import tw from "tailwind-styled-components";
import RideBoard from "./RideBoard";
import axios from "axios";
import { useState ,useEffect} from "react";
const VehicleList = ({start,end,chosenCar})=>{
    const [rideDuration, setRideDuration] = useState();
    const transform = (ele)=>{
        if(ele.long!==undefined)
        {
            return [ele.long,ele.lat];
        }
        else{
            return ele;
        }
    };
    useEffect(() => {
        if ((start && end)) {
            const transformedStart = transform(start);  // Don't modify start directly
            const transformedEnd = transform(end);
    
            axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${transformedStart[0]},${transformedStart[1]};${transformedEnd[0]},${transformedEnd[1]}`, {
                params: {
                    access_token: "pk.eyJ1IjoiMjJiMDFhNDU3MSIsImEiOiJjbTI1bXp6ejMwdGpyMmtxczE3YjdkMWdrIn0.vR3Jo3g42sq164srmV-4Qg"
                }
            })
            .then((res) => {
                setRideDuration(res.data.routes[0].duration);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [start, end]);
    
    const getCar = (car) => {
        console.log('Selected Car:', car);  // Debugging log
        chosenCar(car);
     };
    return(
        <Wrapper>
            <Head>Choose a ride or swipe up for more</Head>
            <RideBoard time={rideDuration} chooseCar={getCar}/>
        </Wrapper>
    );
};
const Wrapper = tw.div`
flex-1
`;
const Head = tw.div`
flex
justify-center
p-2
bg-gray-50
text-sm
text-slate-500
border
`;
export default VehicleList;