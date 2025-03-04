'use client';
import LegalBreadcrumb from '@/components/layout/LegalBreadcrumb';
import { Divider, Typography } from 'antd';
const { Title, Paragraph } = Typography;

const TermsAndConditionsPage = () => {
	return (
		<section className="legal-container">
			<LegalBreadcrumb currentPage="Términos y Condiciones" />

			<Title level={2}>TÉRMINOS Y CONDICIONES</Title>

			<Title level={3}>GLOSARIO</Title>
			<Paragraph>
				<b>KAPSALON:</b> es una plataforma web que permite el acercamiento y la
				interacción entre barberos y usuarios para facilitar el agendamiento de citas de
				barbería.
			</Paragraph>
			<Paragraph>
				<b>BARBERÍA:</b> son los aliados que prestan servicios de estética y belleza.
				Representa las instalaciones o espacios físicos que se encuentran en esta
				plataforma y que ofrecen servicios de estética y belleza por medio de los
				barberos.
			</Paragraph>
			<Paragraph>
				<b>BARBERO:</b> Miembro del equipo de la barbería, capacitado para presentar
				servicios de estética y belleza.
			</Paragraph>
			<Paragraph>
				<b>USUARIO(S):</b> clientes que actúan como tercero que tenga como objetivo la
				reserva de una cita para servicios de barbería. Son personas naturales que por
				medio de un smartphone o computador, navega y utiliza el sitio web con dicha
				finalidad.
			</Paragraph>
			<Paragraph>
				Estos términos y condiciones regirán el uso de estos servicios. Se debe entender
				como servicio de KAPSALON a la intermediación para el agendamiento de citas para
				la prestación de servicios de estética y belleza. Siendo este, el mero acuerdo
				entre barberos y usuarios, sin abarcar la calidad del mismo, la duración, los
				insumos utilizados, los impactos generados como consecuencia del servicio, la no
				prestación del mismo.
			</Paragraph>
			<Paragraph>
				El servicio que presta KAPSALON y cualquier otro servicio contenido en esta página
				web es para uso exclusivo de el USUARIO. El USUARIO no tiene ningún derecho,
				licencia o título que sea transferido por KAPSALON.
			</Paragraph>

			<Divider />

			<Title level={3}>TÉRMINOS GÉNERALES</Title>
			<Paragraph>
				El USUARIO acepta utilizar el servicio de acuerdo con las pautas que se señalan a
				continuación:
			</Paragraph>
			<Paragraph>
				El USUARIO debe tener más de 18 años y ser ciudadano de la República de Colombia.
			</Paragraph>
			<Paragraph>
				El USUARIO no puede postear fotos o escribir comentarios sexualmente agresivos o
				que afecten la honra de los demás usuarios.
			</Paragraph>
			<Paragraph>
				El USUARIO es el único responsable de cualquier actividad que ocurra bajo su
				nombre y en su cuenta.
			</Paragraph>
			<Paragraph>
				El USUARIO es responsable de mantener su contraseña y sus datos seguros, dado el
				caso la aplicación le solicite la creación de una.
			</Paragraph>
			<Paragraph>
				El USUARIO no puede utilizar esta página para amenazar o intimidar a otros
				usuarios de la página.
			</Paragraph>
			<Paragraph>
				El USUARIO no podrá utilizar esta plataforma para la realización de cualquier
				actividad ilegal o no autorizada bajo las leyes de Colombia.
			</Paragraph>
			<Paragraph>
				El USUARIO no está autorizado para adaptar, modificar, transformar esta
				plataforma, ni cualquier otra relacionada a ésta.
			</Paragraph>
			<Paragraph>
				El USUARIO acepta no crear trabajo derivados de la plataforma KAPSALON y no
				remover, alterar, desactivar o degradar cualquier contenido dispuesto en esta.
			</Paragraph>
			<Paragraph>
				El USUARIO no deberá transmitir ningún tipo de virus o código de naturaleza
				destructiva.
			</Paragraph>
			<Paragraph>
				La violación de cualquiera de estos términos resultará en la terminación de la
				cuenta en la plataforma. Se prohíbe todo tipo de conducta ilegal y no se
				responsabiliza del contenido que sea escrito por cualquier persona que utilice la
				plataforma. En consecuencia, el USUARIO utiliza esta página bajo su propio riesgo
				y responsabilidad.
			</Paragraph>
		</section>
	);
};

export default TermsAndConditionsPage;
