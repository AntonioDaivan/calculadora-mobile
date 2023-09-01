import { useContext, useState } from "react"
import { Switch } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { ThemeContext } from "styled-components"

import { ButtonComponent } from "../components/Button"
import { ScreenComponent } from "../components/Screen"

import { Container, RowButtonArea, SwitchArea } from "./styles"

export const HomeComponent = ({ toggleTheme }) => {

    const [ isEnable, setIsEnable ] = useState(false)
    const [ displayValue, setDisplayValue ] = useState('0')
    const [ clearDisplay, setClearDisplay ] = useState(false)

    const { colors, title } = useContext(ThemeContext)

    const calculation = {
        savedValue: null,
        functionCalculation: null
    }

    const addDigit = digit => {
        const cleanDisplay = displayValue === '0' || clearDisplay

        const currentValue = cleanDisplay ? '' : displayValue
        setDisplayValue(currentValue + digit)
    }

    const addDot = () => {
        if(displayValue === ' ' || isNaN(displayValue)){setDisplayValue('0.')}
        else if(!displayValue.includes('.')) setDisplayValue(displayValue + '.')
    }

    const sum = (value1, value2) => value1 + value2 
    const sub = (value1, value2) => value1 - value2 
    const mult = (value1, value2) => value1 * value2
    const div = (value1, value2) => {
        if(value2 == 0) return
        return value1 / value2
    }

    const submitOperator = operator => {
        if(operator === '+'){calculation.functionCalculation = sum}
        else if(operator === '-'){calculation.functionCalculation = sub}
        else if(operator === '*'){calculation.functionCalculation = mult}
        else if(operator === '/'){calculation.functionCalculation = div}
    }

    const returnResult = () => {
        console.warn('entrou na função')
        if(calculation.functionCalculation !== null){
            const result = calculation.functionCalculation(calculation.savedValue, Number(displayValue))

            console.warn(result)
            setDisplayValue(result)
            calculation.savedValue = result
            calculation.functionCalculation = null
        }
    }

    const del = () => {
        const value = displayValue.slice(0, displayValue.length - 1)
        !value ? setDisplayValue('0') : setDisplayValue(value)
    }

    const clear = () => {
        setDisplayValue('0')
        calculation.savedValue = null
        calculation.functionCalculation = null
    }

    return(
        <Container colors={[colors.primary, colors.secondary]}>
            <SwitchArea>
                <Icon name='sun' size={20} color={colors.colorFunctionPrimary} solid />
                <Switch
                    value={title == 'dark'}
                    onValueChange={toggleTheme}
                    thumbColor={colors.colorSwitch}
                    trackColor={{
                        false: colors.colorFunctionPrimary,
                        true: colors.colorFunctionPrimary,
                    }}
                />
                <Icon name='moon' size={20} color={colors.colorFunctionSecondary} solid />
            </SwitchArea>

            <ScreenComponent inputValue={displayValue}/>

            <RowButtonArea>
                <ButtonComponent value={'C'} color={colors.colorFunctionSecondary} onPress={() => clear('C')}/>
                <ButtonComponent value={'+/-'} color={colors.colorFunctionSecondary} onPress={() => console.warn('+/-')}/>
                <ButtonComponent value={'%'} color={colors.colorFunctionSecondary} onPress={() => console.warn('%')}/>
                <ButtonComponent value={'/'} color={colors.colorFunctionPrimary} onPress={() => submitOperator('/')}/>
            </RowButtonArea>
            <RowButtonArea>
                <ButtonComponent value={'7'} onPress={() => addDigit('7')}/>
                <ButtonComponent value={'8'} onPress={() => addDigit('8')}/>
                <ButtonComponent value={'9'} onPress={() => addDigit('9')}/>
                <ButtonComponent value={'*'} color={colors.colorFunctionPrimary} onPress={() => submitOperator('*')}/>
            </RowButtonArea>
            <RowButtonArea>
                <ButtonComponent value={'4'} onPress={() => addDigit('4')}/>
                <ButtonComponent value={'5'} onPress={() => addDigit('5')}/>
                <ButtonComponent value={'6'} onPress={() => addDigit('6')}/>
                <ButtonComponent value={'-'} color={colors.colorFunctionPrimary} onPress={() => submitOperator('-')}/>
            </RowButtonArea>
            <RowButtonArea>
                <ButtonComponent value={'1'} onPress={() => addDigit('1')}/>
                <ButtonComponent value={'2'} onPress={() => addDigit('2')}/>
                <ButtonComponent value={'3'} onPress={() => addDigit('3')}/>
                <ButtonComponent value={'+'} color={colors.colorFunctionPrimary} onPress={() => submitOperator('+')}/>
            </RowButtonArea>
            <RowButtonArea>
                <ButtonComponent value={'0'} onPress={() => addDigit('0')}/>
                <ButtonComponent value={'.'} onPress={() => addDot('.')}/>
                <ButtonComponent value={'<-'} onPress={del}/>
                <ButtonComponent value={'='} color={colors.backgroundEquals} onPress={returnResult}/>
            </RowButtonArea>
        </Container>
    )
}