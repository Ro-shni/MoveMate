import tw from "tailwind-styled-components";
import { useRouter } from 'next/router';

const ConfirmArea = ({ selectedCar }) => {
    const router = useRouter();

    const handleConfirm = () => {
        if (selectedCar) {
            // Redirect to booking summary page or wherever you need
            router.push({
                pathname: '/summary', // Or your target page
                query: { carType: selectedCar }
            });
        } else {
            alert('Please select a ride first!');
        }
    };

    return (
        <Wrapper>
            <Button onClick={handleConfirm}>
                {!selectedCar ? "Choose a Ride" : `Confirm ${selectedCar}`}
            </Button>
        </Wrapper>
    );
};

const Wrapper = tw.div`
flex
flex-col
justify-center
items-center
p-3
border

`;
const Button = tw.div`
flex
bg-black
justify-center
items-center
text-white
p-4
w-80
rounded
hover:cursor-pointer
`;
export default ConfirmArea;