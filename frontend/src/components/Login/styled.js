// import styled from 'styled-components';

// export const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background: #f0f0f0;
// `;

// export const FormWrapper = styled.div`
//   background-color: white;
//   padding: 30px;
//   border-radius: 10px;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//   width: 100%;
//   max-width: 400px;
// `;

// export const Title = styled.h2`
//   text-align: center;
//   color: #333;
// `;

// export const Input = styled.input`
//   width: 100%;
//   padding: 12px;
//   margin: 10px 0;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   font-size: 16px;
//   &:focus {
//     border-color: #4e73df;
//     outline: none;
//   }
// `;

// export const Button = styled.button`
//   width: 100%;
//   padding: 12px;
//   background-color: #4e73df;
//   color: white;
//   font-size: 16px;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
//   &:hover {
//     background-color: #3e5bbf;
//   }
// `;


import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #ff6f61, #d64b30);
  padding: 20px;
  width:100vw;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const FormWrapper = styled.div`
  background-color: white;
  padding: 40px 50px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 30px;
  }
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  background-color: #fafafa;
  transition: all 0.3s ease;

  &:focus {
    border-color: #ff6f61;
    background-color: #fff;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 14px;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #ff6f61;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;

  &:hover {
    background-color: #d64b30;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 12px;
  }
`;

