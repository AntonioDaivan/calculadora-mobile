import { styled } from "styled-components/native"

const ScreenArea = styled.View`
    flex: 3;
    justify-content: flex-end;
    align-items: flex-end;
    padding-left: 20px;
    padding-right: 20px;
`

const ScreenResult = styled.TextInput`
    font-size: 70px;
    color: ${props => props.theme.colors.colorNumber};
`

const ScreenOperation = styled.TextInput`
    font-size: 35px;
    color: ${props => props.theme.colors.colorNumber};
`

export const ScreenComponent = ({ resultValue, operationValue }) => {
    return(
        <ScreenArea>
            <ScreenOperation 
                editable={false}
                value={operationValue.toString()}
            />
            <ScreenResult
                editable={false}
                maxLength={12}
                value={resultValue.toString()}
            />
        </ScreenArea>
    )
}