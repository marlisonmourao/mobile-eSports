import { TouchableOpacity, View, Text } from 'react-native';
import { GameController } from 'phosphor-react-native'

import { styles } from './styles';

import { DuoInfo } from '../DuoInfo';
import { THEME } from '../../theme';

export interface DuoCardProps {
  id: string
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
  onConenct: () => void;
}


export function DuoCard({ data, onConenct }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo 
        label='Nome'
        value={data.name}
      />

      <DuoInfo 
        label='Tempo de jogo'
        value={`${data.yearsPlaying} anos`}
      />

       <DuoInfo 
        label='Disponibilidade'
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />

       <DuoInfo 
        label='Chaamda de áudio'
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onConenct}
      >
        <GameController 
          color={THEME.COLORS.TEXT}
          size={20}
        />
        <Text style={styles.buttonTitle}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}