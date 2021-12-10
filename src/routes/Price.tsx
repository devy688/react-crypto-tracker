import styled, { keyframes } from "styled-components";

interface IPrice {
  price?: number | bigint;
  marketCap?: number;
  change12h?: number;
  change7d?: number;
}

const fadeIn = keyframes`
  from {
		opacity: 0;
		transform: translateY(-5%);
    
	}
	to {
    opacity: 1;
    transform: translateY(0);
	}
`;

const PriceList = styled.ul`
  width: 100%;
  height: 250px;
  li:nth-child(2) {
    animation-delay: 300ms;
  }

  li:nth-child(3) {
    animation-delay: 600ms;
  }
  li:nth-child(4) {
    animation-delay: 900ms;
  }
`;

const PriceItem = styled.li`
  background-color: ${(props) => props.theme.listColor};
  border: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 10px;
  display: flex;
  padding: 15px 40px;
  font-size: 12px;
  margin-bottom: 12px;
  opacity: 0;
  animation: ${fadeIn} 1s ease-out both;
`;

const Menu = styled.span`
  color: ${(props) => props.theme.accentColor};
  flex: 1 1 40%;
`;

const Value = styled.span`
  flex: 1 1 60%;
`;

const Price = ({ price, marketCap, change12h, change7d }: IPrice) => {
  return (
    <PriceList>
      <PriceItem>
        <Menu>Price</Menu>
        <Value>${price}</Value>
      </PriceItem>
      <PriceItem>
        <Menu>12h %</Menu>
        <Value>{change12h}%</Value>
      </PriceItem>
      <PriceItem>
        <Menu>7d %</Menu>
        <Value>{change7d}%</Value>
      </PriceItem>
      <PriceItem>
        <Menu>Market Cap</Menu>
        <Value>
          {marketCap?.toLocaleString("en-us", {
            style: "currency",
            currency: "USD",
          })}
        </Value>
      </PriceItem>
    </PriceList>
  );
};

export default Price;
