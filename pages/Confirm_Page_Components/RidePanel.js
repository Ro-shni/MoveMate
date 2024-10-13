import tw from "tailwind-styled-components";
const RidePanel = ({ img, title, cost, status, chooseCar }) => {
  return (
    <Wrapper
      className="wrapper"
      onClick={() => {
        chooseCar(title);  // Directly pass the title when clicked
      }}
    >
      <Details>
        <Icon src={img} />
        <Div>
          <Name>{title}</Name>
          <Status>{status}</Status>
        </Div>
      </Details>
      <Cost>{cost}</Cost>
    </Wrapper>
  );
};


const Wrapper = tw.div`
flex
justify-between
items-center
px-3
hover:scale-105 duration-300
hover:cursor-pointer
`;
const Details = tw.div`
flex
items-center
`;
const Cost = tw.div`
font-medium
text-sm
`;
const Icon = tw.img`
h-24
`;
const Div = tw.div`
flex
flex-col
mx-1
`;
const Name = tw.div`
font-medium
`;
const Status = tw.div`
text-blue-500
text-xs
`;
export default RidePanel;
