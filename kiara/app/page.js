import Image from "next/image";
import kiara from '../public/logo/logo_kiara.png'

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#000000'
    }}>
      <Image
        src={kiara}
        alt="Logo da Kiara"
        width={300}
        height={400}
      />
      <p style={{
        color: '#ffffff',
        marginTop: '20px',
        fontSize: '18px',
      }}>
        Em desenvolvimento...
      </p>
    </div>
  );
}
