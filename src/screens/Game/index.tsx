import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Entypo } from '@expo/vector-icons'

import logoImg from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

import { styles } from './styles';
import { THEME } from '../../theme';
import { useEffect, useState } from 'react';


type RouteParamsProps = {
  id: string;
  title: string;
  bannerUrl: string;
}
export function Game() {
  const [duo, setDuo] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  const route = useRoute()
  const game = route.params as RouteParamsProps

  const { goBack } = useNavigation()

  async function getDiscordUser(adsId: string) {
    try {
      fetch(`http://10.0.0.107:3333/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => setDiscordDuoSelected(data.discord))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    try {
      fetch(`http://10.0.0.107:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuo(data))
    } catch (error) {
      console.log(error)
    }
  }, [])
  

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={goBack}
          >
            <Entypo 
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />

          </TouchableOpacity>

          <Image 
            source={logoImg}
            style={styles.logo}
          />
         
         <View style={styles.right} />

        </View>

        <Image 
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

         <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
         />

         <FlatList  
           data={duo}
           keyExtractor={item => item.id}
           horizontal
           showsVerticalScrollIndicator={false}
           style={styles.containerList}
           ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
           )}
           contentContainerStyle={[duo.length > 0 ? styles.contentList : styles.emptyListContent ]}
           renderItem={({ item }) => (
            <DuoCard 
              data={item}
              onConenct={() => getDiscordUser(item.id)}
            />
           )}
         />

         <DuoMatch 
          visible={discordDuoSelected.length > 0 }
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
         />
      </SafeAreaView>
    </Background>
  );
}