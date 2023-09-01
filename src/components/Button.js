import styled from 'styled-components/native'

const ButtonArea = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const Button = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    background-color: ${props => props.background || 'transparent'};
    border-radius: 10px;
    width: 65px;
    height: 65px;
`

const ButtonText = styled.Text`
    font-size: 35px;
    font-weight: bold;
    color: ${props => props.color || props.theme.colors.colorNumber};
`

export const ButtonComponent = ({ value, color, background, onPress}) => {
    return(
        <ButtonArea>
            <Button background={background} onPress={onPress}>
                <ButtonText color={color}>
                    {value}
                </ButtonText>
            </Button>
        </ButtonArea>
    )
}