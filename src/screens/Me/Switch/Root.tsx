import Button from '@components/Button'
import ComponentInstance from '@components/Instance'
import { useNavigation } from '@react-navigation/native'
import { useAccountCheckQuery } from '@utils/queryHooks/accountCheck'
import {
  getLocalActiveIndex,
  getLocalInstances,
  InstanceLocal,
  InstancesState,
  localUpdateActiveIndex
} from '@utils/slices/instancesSlice'
import { StyleConstants } from '@utils/styles/constants'
import { useTheme } from '@utils/styles/ThemeManager'
import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  index: NonNullable<InstancesState['local']['activeIndex']>
  instance: InstanceLocal
  disabled?: boolean
}

const AccountButton: React.FC<Props> = ({
  index,
  instance,
  disabled = false
}) => {
  const queryClient = useQueryClient()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { isLoading, data } = useAccountCheckQuery({
    id: instance.account.id,
    index,
    options: { retry: false }
  })

  return (
    <Button
      type='text'
      disabled={disabled}
      loading={isLoading}
      style={styles.button}
      content={`@${data?.acct || '...'}@${instance.url}`}
      onPress={() => {
        dispatch(localUpdateActiveIndex(index))
        queryClient.clear()
        navigation.goBack()
      }}
    />
  )
}

const ScreenMeSwitchRoot = () => {
  const { theme } = useTheme()
  const localInstances = useSelector(getLocalInstances)
  const localActiveIndex = useSelector(getLocalActiveIndex)

  return (
    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={styles.firstSection}>
          <Text style={[styles.header, { color: theme.primary }]}>
            登录新的服务器
          </Text>
          <ComponentInstance type='local' disableHeaderImage goBack />
        </View>
        <View style={[styles.secondSection, { borderTopColor: theme.border }]}>
          <Text style={[styles.header, { color: theme.primary }]}>
            选择已有账号
          </Text>
          <View style={styles.accountButtons}>
            {localInstances.length
              ? localInstances.map((instance, index) => (
                  <AccountButton
                    key={index}
                    index={index}
                    instance={instance}
                    disabled={localActiveIndex === index}
                  />
                ))
              : null}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  header: {
    ...StyleConstants.FontStyle.M,
    textAlign: 'center',
    paddingVertical: StyleConstants.Spacing.S
  },
  firstSection: {
    marginTop: StyleConstants.Spacing.S
  },
  secondSection: {
    marginHorizontal: StyleConstants.Spacing.Global.PagePadding,
    paddingTop: StyleConstants.Spacing.M,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  accountButtons: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: StyleConstants.Spacing.M
  },
  button: {
    marginBottom: StyleConstants.Spacing.M
  }
})

export default ScreenMeSwitchRoot
