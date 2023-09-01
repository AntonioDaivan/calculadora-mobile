import { styled } from "styled-components/native"
import { LinearGradient } from "expo-linear-gradient"

export const Container = styled(LinearGradient)`
    flex: 1;
    padding: 0 5px 20px;
`

export const RowButtonArea = styled.View`
    flex: 1;
    flex-direction: row;
`

export const SwitchArea = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
`