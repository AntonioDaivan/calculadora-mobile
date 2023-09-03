import { useContext, useState } from "react"
import { Switch } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { ThemeContext } from "styled-components"

import { ButtonComponent } from "../components/Button"
import { ScreenComponent } from "../components/Screen"

import { Container, RowButtonArea, SwitchArea } from "./styles"

export const HomeComponent = ({ toggleTheme }) => {

    const [ displayValue, setDisplayValue ] = useState('0')
    const [ savedValue, setSavedValue ] = useState(null)
    const [ functionCalculation, setFunctionCalculation ] = useState(null)
    const [ operator, setOperator ] = useState(null)
    const { colors, title } = useContext(ThemeContext)

    function operations(operator) {
        if (typeof operator !== "string") throw Error("Operator must be string")
        const ops = {
            "+": (value1, value2) => value1 + value2,
            "-": (value1, value2) => value1 - value2,
            "*": (value1, value2) => value1 * value2,
            "/": (value1, value2) => value2 === 0 ? 0 : (value1 / value2)
        }

        return ops[operator]
    }

    function addDigit(digit) {
        const cleanDisplay = displayValue === '0' || isNaN(displayValue)

        const currentValue = cleanDisplay ? '' : displayValue
        setDisplayValue(currentValue + digit)
    }

    function addDot() {
        if(displayValue === ' ' || isNaN(displayValue)){setDisplayValue('0.')}
        else if(!displayValue.includes('.')) setDisplayValue(displayValue + '.')
    }

    function saveFirstValue(){
        if (savedValue !== null) return
        setSavedValue(displayValue)
        saveResultValue(operator)
    }

    function saveResultValue(operator){
        if (savedValue === null) return
        setSavedValue(operations(operator)(savedValue, displayValue))
    }

    function directOperator(operator) {
        setOperator(operator)
        if (typeof operator !== "string") throw Error("Operator must be string")

        setFunctionCalculation(operations(operator))
        setDisplayValue(operator)
        saveFirstValue()
    }

    function returnResult(operator) {
        if(functionCalculation === null) return
        const result = operations(operator)(Number(savedValue), Number(displayValue))

        setDisplayValue(result)
        setSavedValue(result)
        setFunctionCalculation(null)
    }

    function del() {
        const value = displayValue.toString().slice(0, displayValue.length - 1)
        value.length < 1 ? setDisplayValue('0') : setDisplayValue(value)
        setSavedValue(value)
    }

    function clear() {
        setDisplayValue('0')
        setSavedValue(null)
        setFunctionCalculation(null)
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
                <ButtonComponent value={'/'} color={colors.colorFunctionPrimary} onPress={() => directOperator('/')}/>
            </RowButtonArea>
            <RowButtonArea>
                <ButtonComponent value={'7'} onPress={() => addDigit('7')}/>
                <ButtonComponent value={'8'} onPress={() => addDigit('8')}/>
                <ButtonComponent value={'9'} onPress={() => addDigit('9')}/>
                <ButtonComponent value={'*'} color={colors.colorFunctionPrimary} onPress={() => directOperator('*')}/>
            </RowButtonArea>
            <RowButtonArea>
                <ButtonComponent value={'4'} onPress={() => addDigit('4')}/>
                <ButtonComponent value={'5'} onPress={() => addDigit('5')}/>
                <ButtonComponent value={'6'} onPress={() => addDigit('6')}/>
                <ButtonComponent value={'-'} color={colors.colorFunctionPrimary} onPress={() => directOperator('-')}/>
            </RowButtonArea>
            <RowButtonArea>
                <ButtonComponent value={'1'} onPress={() => addDigit('1')}/>
                <ButtonComponent value={'2'} onPress={() => addDigit('2')}/>
                <ButtonComponent value={'3'} onPress={() => addDigit('3')}/>
                <ButtonComponent value={'+'} color={colors.colorFunctionPrimary} onPress={() => directOperator('+')}/>
            </RowButtonArea>
            <RowButtonArea>
                <ButtonComponent value={'0'} onPress={() => addDigit('0')}/>
                <ButtonComponent value={'.'} onPress={() => addDot('.')}/>
                <ButtonComponent value={'<'} onPress={del}/>
                <ButtonComponent value={'='} color={colors.backgroundEquals} onPress={() => returnResult(operator)}/>
            </RowButtonArea>
        </Container>
    )
}