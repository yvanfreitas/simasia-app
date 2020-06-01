import React from 'react';
import { useEffect, useState } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';

function App() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
					type: prefersDarkMode ? 'dark' : 'light',
					primary: {
						main: '#ff4400',
					},
					secondary: {
						light: '#0066ff',
						main: '#0044ff',
						contrastText: '#ffcc00',
					},
					contrastThreshold: 3,
					tonalOffset: 0.2,
        },
      }),
		[prefersDarkMode],
	);
	
	const [value, setValue] = React.useState('0');

	const handleValue = (event, newValue) => {
		setValue(newValue);
		calc(size,newValue);
	};

	const [size, setSize] = React.useState('0');

	const handleSize = (event, newSize) => {
		setSize(newSize);
		calc(newSize,value);
	};

	var tempPriority = [];
	tempPriority.class = 'result-card priority-d';
	tempPriority.title = 'Lizard';
	tempPriority.desc = 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica';
	tempPriority.img = '/contemplative-reptile.jpg';

	const [priority, setPriority] = React.useState([]);


	function calc(size,value){
		let score = parseInt(size)+parseInt(value);
		var tempPriority = [];

		if(parseInt(size)>0 &&  parseInt(value)>0){
			if(score >= 1 && score <= 3){
				tempPriority.class = 'result-card priority-xs';
				tempPriority.title = 'Muito baixa';
				tempPriority.desc = 'Provavelmente não vale a pena focarmos nossas energias nessa Issue.';
				tempPriority.img = '/GPgJ.gif';
			}
			if(score >= 4 && score <= 5){
				tempPriority.class = 'result-card priority-s';
				tempPriority.title = 'Baixa';
				tempPriority.desc = 'Podemos olhar para essa Issue quando estivermos tranquilos.';
				tempPriority.img = '/01-funny-gif-138-red-panda-walking.gif';
			}
			if(score == 6){
				tempPriority.class = 'result-card priority-m';
				tempPriority.title = 'Média';
				tempPriority.desc = 'Essa é uma Issue média. Está exatamente balanceada entre esforço e valor.';
				tempPriority.img = '/Lhab.gif';
			}
			if(score >= 7 && score <= 8){
				tempPriority.class = 'result-card priority-l';
				tempPriority.title = 'Alta';
				tempPriority.desc = 'Não é nossa maior prioridade, mas é algo importante. Independente do esforço, devemos ataca-la!';
				tempPriority.img = '/running-cheetah.gif';
			}
			if(score >= 9 && score <= 10){
				tempPriority.class = 'result-card priority-xl';
				tempPriority.title = 'Muito Alta';
				tempPriority.desc = 'Essa é uma Issue importante e rápida de "shipar". Vamos focar nossas energias nela!';
				tempPriority.img = '/RichPoliticalAustraliancurlew-size_restricted.gif';
			}
		}else{
			tempPriority.class = 'result-card priority-d';
		}
		setPriority(tempPriority);
	}

	return (
		<main>
			<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Typography variant="h2">Simasia</Typography>
			<Typography variant="subtitle1">Um simples priorizador de Issues!</Typography>
			<Typography variant="h4">Relevância</Typography>
					<ToggleButtonGroup 
						className="options"
						value={value}
						exclusive
						onChange={handleValue}
						aria-label="text Value"
					>
						<ToggleButton className="option" value="1" aria-label="xs">
							
							<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										É um desejo nosso, mas não faz parte do conceito do produto
									</Typography>
								</CardContent>
							</Card>

							<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										Sabemos que isso pode ficar para depois
									</Typography>
								</CardContent>
							</Card>

							<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										Nosso cliente pode estranhar, mas é contornável
									</Typography>
								</CardContent>
							</Card>

						</ToggleButton>
						<ToggleButton className="option" value="2" aria-label="s">
							
						<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										Achamos que complementa o conceito do produto
									</Typography>
								</CardContent>
							</Card>

							<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										Podemos esperar com algum custo de oportunidade
									</Typography>
								</CardContent>
							</Card>

							<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										Sabemos que a falta disso pode prejudicar a experiência
									</Typography>
								</CardContent>
							</Card>

						</ToggleButton>
						<ToggleButton className="option" value="3" aria-label="m">
							
						<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										Já comprovamos a importância disso para o produto
									</Typography>
								</CardContent>
							</Card>

							<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										Queremos lançar em breve, dado o custo de oportunidade
									</Typography>
								</CardContent>
							</Card>

							<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										Já nos certificamos que a ausência disso causa frustração
									</Typography>
								</CardContent>
							</Card>

						</ToggleButton>
						<ToggleButton className="option" value="4" aria-label="l">
							
						<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										Estamos assumindo um risco ao lançar sem isso
									</Typography>
								</CardContent>
							</Card>

							<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										Teremos problemas e perdas muito em breve sem isso
									</Typography>
								</CardContent>
							</Card>

							<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										Teremos uma péssima experiência sem isso 
									</Typography>
								</CardContent>
							</Card>

						</ToggleButton>
						<ToggleButton className="option" value="5" aria-label="xl">

							<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										Sabemos que o produto não é utilizável sem isso
									</Typography>
								</CardContent>
							</Card>

							<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										Precisamos reduzir a perda, parar demandas e fazer isso
									</Typography>
								</CardContent>
							</Card>

							<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										Perderemos fatalmente nossos clientes sem isso
									</Typography>
								</CardContent>
							</Card>

						</ToggleButton>
					</ToggleButtonGroup>
				<Typography variant="h4">Esforço</Typography>
				<ToggleButtonGroup 
						className="options"
						value={size}
						exclusive
						onChange={handleSize}
						aria-label="text Size"
					>
						<ToggleButton className="option" value="5" aria-label="xs">
							
							<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										Horas
									</Typography>
								</CardContent>
							</Card>

						</ToggleButton>
						<ToggleButton className="option" value="4" aria-label="s">
							
							<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										Dia
									</Typography>
								</CardContent>
							</Card>

						</ToggleButton>
						<ToggleButton className="option" value="3" aria-label="m">
							
							<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										Dias
									</Typography>
								</CardContent>
							</Card>

						</ToggleButton>
						<ToggleButton className="option" value="2" aria-label="l">
							
							<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										Semana
									</Typography>
								</CardContent>
							</Card>

						</ToggleButton>
						<ToggleButton className="option" value="1" aria-label="xl">

							<Card className="root">
								<CardContent>
									<Typography variant="body2" component="p">
										Semanas
									</Typography>
								</CardContent>
							</Card>

						</ToggleButton>
					</ToggleButtonGroup>
				<Typography variant="h4">Prioridade</Typography>
				<Card className={priority.class}>
					<CardActionArea>
						<CardMedia
							className="result-img"
							image={priority.img}
							title="Contemplative Reptile"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								{priority.title}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								{priority.desc}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>

			</ThemeProvider>		
		</main>
	);
}

export default App;
