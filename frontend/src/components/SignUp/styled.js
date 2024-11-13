import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
   width:100vw;
  background: linear-gradient(135deg, #6f9fff, #4b7fd6);
  padding: 20px;

  @media (max-width: 1200px) {
    padding: 15px;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

export const FormWrapper = styled.div`
  background-color: white;
  padding: 40px 50px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 30px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 20px;
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

  @media (max-width: 480px) {
    font-size: 1.2rem;
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
    border-color: #6f9fff;
    background-color: #fff;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 12px;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #6f9fff;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;

  &:hover {
    background-color: #4b7fd6;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 12px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px;
  }
`;

export const Message = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: ${props => (props.error ? 'red' : 'green')};
`;