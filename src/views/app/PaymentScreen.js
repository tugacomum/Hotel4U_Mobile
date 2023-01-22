import * as React from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
    View,
} from 'react-native';
import CreditCard from 'react-native-credit-card-form-ui';

export default function PaymentScreen() {
    const creditCardRef = React.useRef();
    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={20}
        >
            <View style={{ marginTop: 60 }}>
                <CreditCard ref={creditCardRef} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
});