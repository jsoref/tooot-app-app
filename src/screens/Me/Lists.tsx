import { MenuRow } from '@components/Menu'
import { useNavigation } from '@react-navigation/native'
import TimelineEmpty from '@root/components/Timelines/Timeline/Empty'
import { useListsQuery } from '@utils/queryHooks/lists'
import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'

const ScreenMeLists: React.FC = () => {
  const navigation = useNavigation()
  const { status, data, refetch } = useListsQuery({})

  const children = useMemo(() => {
    if (status === 'success') {
      return data?.map((d: Mastodon.List, i: number) => (
        <MenuRow
          key={i}
          iconFront='List'
          title={d.title}
          onPress={() =>
            navigation.navigate('Screen-Me-Lists-List', {
              list: d.id,
              title: d.title
            })
          }
        />
      ))
    } else {
      return <TimelineEmpty status={status} refetch={refetch} />
    }
  }, [status])

  return <>{children}</>
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center'
  }
})

export default ScreenMeLists
