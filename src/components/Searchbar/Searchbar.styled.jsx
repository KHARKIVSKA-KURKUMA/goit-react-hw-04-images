import styled from 'styled-components';

const Header = styled.header`
  background-color: #f2f2f2;
  padding: 10px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: center;
  gap: 40px;
`;

const Button = styled.button`
  background-color: #51e33d;
  color: #fff;
  border: none;
  padding: 10px;
  font-weight: bold;
  border-radius: 4px;
  min-width: 100px;
  &:hover {
    background-color: #269519;
  }
`;

const ButtonLabel = styled.span`
  margin-left: 5px;
`;

const Input = styled.input`
  padding: 10px;
  margin-left: 10px;
  border: none;
  border-bottom: 2px solid #51e33d;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  width: 100%;
  &::placeholder {
    color: #999;
  }

  &:focus {
    border-color: #269519;
  }
`;

export { Header, Form, Button, ButtonLabel, Input };
