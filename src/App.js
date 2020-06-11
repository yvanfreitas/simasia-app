import React from 'react';
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

let framework;
let frameworks = {
	cx: require('./frameworks/cx.json'),
	rut: require('./frameworks/rut.json'),
	gut: require('./frameworks/cx.json'),
	moskow: require('./frameworks/cx.json'),
	rice: require('./frameworks/cx.json'),
};

var pathname = window.location.pathname.replace('/','');
if(pathname){
	framework = frameworks[pathname];
}else{
	framework = frameworks['cx'];
}

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

	const [kind, setKind] = React.useState(framework[0]);

	const handleKind = (event, newKind) => {
		setSize(0);
		setValue(0);
		if(newKind){
			setKind(newKind);
		}
	};
	const [priority, setPriority] = React.useState([]);

	function calc(size,value){
		let score = parseInt(size)+parseInt(value);
		var tempPriority = [];
		if(parseInt(size)>0 &&  parseInt(value)>0){
			for(let i=0; kind.priority.length>i; i++){
				if(kind.priority[i].minscore <= score && kind.priority[i].maxscore >= score){
					tempPriority.title = kind.priority[i].name;
					tempPriority.desc = kind.priority[i].description;
					tempPriority.img = kind.priority[i].image;

					if(prefersDarkMode){
						tempPriority.style = {backgroundColor: kind.priority[i].color};
					}else{
						tempPriority.style = {color: kind.priority[i].color};
					}
				} 
			}
		}
		setPriority(tempPriority);
	}

	return (
		<main>
			<ThemeProvider theme={theme}>
			<CssBaseline/>

			<Typography variant="h2">Simasia</Typography>
			<Typography variant="subtitle1">Um simples priorizador de Issues!</Typography>

			<ToggleButtonGroup 
						className="kinds"
						value={kind}
						exclusive
						onChange={handleKind}
					>
				{framework.map(kindobj => (
					<ToggleButton className="kind-option" value={kindobj} aria-label={kindobj.label}>
						<Typography variant="body2" component="p">
							{kindobj.name}
						</Typography>
					</ToggleButton>
            	))}
			</ToggleButtonGroup>

			<Typography variant="h4">Relevância</Typography>

			<ToggleButtonGroup 
				className="options"
				value={value}
				exclusive
				onChange={handleValue}
				aria-label="text Value"
			>

			{kind.value.map(value => ( 
				<ToggleButton className="option" value={value.score} aria-label={value.name}>
					{value.questions.map(question => (
						<Card className="root">
							<CardContent>
								<Typography variant="body2" component="p">
									{question}
								</Typography>
							</CardContent>
						</Card>
					))}
				</ToggleButton>
			))}	

			</ToggleButtonGroup>

			<Typography variant="h4">Esforço</Typography>

			<ToggleButtonGroup 
					className="options"
					value={size}
					exclusive
					onChange={handleSize}
					aria-label="text Size"
				>
			{kind.size.map(size => ( 
				<ToggleButton className="option" value={size.score} aria-label={size.name}>
					{size.questions.map(question => (
						<Card className="root">
							<CardContent>
								<Typography variant="body2" component="p">
									{question}
								</Typography>
							</CardContent>
						</Card>
					))}
				</ToggleButton>
			))}	
			</ToggleButtonGroup>

			<Typography variant="h4">Prioridade</Typography>
			
			<Card className="result-card" style={priority.style}>
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
