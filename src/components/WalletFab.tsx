import { FiCreditCard } from 'react-icons/fi';
import FloatingActionButton from './FloatingActionButton';

interface WalletFabProps {
  bottomOffset?: string;
  visible?: boolean;
}

const WalletFab = ({ bottomOffset = 'bottom-32', visible = true }: WalletFabProps) => {
  return (
    <FloatingActionButton
      icon={FiCreditCard}
      to="/my-wallet"
      title="Go to Wallet"
      bgColor="bg-blue-600"
      hoverColor="hover:bg-blue-700"
      bottomOffset={bottomOffset}
      visible={visible}
    />
  );
};

export default WalletFab;
