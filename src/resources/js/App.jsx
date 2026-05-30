import '../css/loader.css';
import { useEffect, useState } from "react";

const topSongs = [
{"id":3,"name":"FEELING","description":"BURGOS x \u26ac RAZEGOD \u271d\ufe0e - FEELING (prod. 1177)","artist":"RAZEGOD","genre":"Phonk","year":2023,"image":"http:\/\/localhost\/images\/695a83ed1166b.jpg"},
{"id":1,"name":"ODIUM","description":"Music: LXST CXNTURY - ODIUM (ft. Kingpin Skinny Pimp)","artist":"LXST CXNTURY","genre":"Phonk","year":2021,"image":"http:\/\/localhost\/images\/695953b82fa0d.jpg"},
{"id":2,"name":"NEVER EXISTED","description":"Music: LXST CXNTURY - NEVER EXISTED","artist":"LXST CXNTURY","genre":"Phonk","year":2020,"image":"http:\/\/localhost\/images\/695a6a9481399.jpg"}
];
const selectedSong = {
"id":3,"name":"FEELING","description":"BURGOS x \u26ac RAZEGOD \u271d\ufe0e - FEELING (prod. 1177)","artist":"RAZEGOD","genre":"Phonk","year":2023,
"image":"http:\/\/localhost\/images\/695a83ed1166b.jpg"
};
const relatedSongs = [
{"id":2,"name":"NEVER EXISTED","description":"Music: LXST CXNTURY - NEVER EXISTED","artist":"LXST CXNTURY","genre":"Phonk","year":2020,"image":"http:\/\/localhost\/images\/695a6a9481399.jpg"},
{"id":1,"name":"ODIUM","description":"Music: LXST CXNTURY - ODIUM (ft. Kingpin Skinny Pimp)","artist":"LXST CXNTURY","genre":"Phonk","year":2021,"image":"http:\/\/localhost\/images\/695953b82fa0d.jpg"}
];



// Galvene un kājene – strukturālas komponentes bez funkcijām vai datiem
function Header() {
	return (
		<header className="bg-black/70 backdrop-blur mb-8 py-2 sticky top-0 text-neutral-50 z-50 border-b border-gray-800">
			<div className="px-4 font-sans text-white text-2xl font-semibold tracking-wide md:container md:mx-0">
				Dziesmu saraksts
			</div>
		</header>
	)
}
function Footer() {
	return (
		<footer className="bg-black/60 backdrop-blur mt-8 text-neutral-50 border-t border-gray-800 ">
			<div className="py-8 md:container md:mx-auto px-2">
				R. Bāders
			</div>
		</footer>
	)
}

// Sākumlapa- ielādē datus no API un attēlo top dziesmas
function Homepage({ handleSongSelection }) {
	const [topSongs, setTopSongs] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	
	useEffect(function () {
		async function fetchTopSongs() {
			try {
				setIsLoading(true);
				setError(null);
				const response = await fetch('http://localhost/data/get-top-songs');
				
				if (!response.ok) {
					throw new Error("Datu ielādes kļūda. Lūdzu, pārlādējiet lapu!");
				}
				
				const data = await response.json();
				console.log('top songs fetched', data);
				setTopSongs(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}
		fetchTopSongs();
	}, []);
	
	return (
		<>
		  {isLoading && <Loader />}
		  {error && <ErrorMessage msg={error} />}
		  {!isLoading && topSongs.map((song, index) => (
			<TopSongView
			  key={song.id}
			  song={song}
			  index={index}
			  handleSongSelection={handleSongSelection}
			/>
		  ))}
		</>
	)
}

// Top grāmatas skats- attēlo sākumlapas grāmatas
function TopSongView({ song, index, handleSongSelection }) {
	return (
		<div
			className={`rounded-lg mb-8 py-8 flex flex-wrap md:flex-row border-2 border-gray-800`}
		  style={{
			background: "linear-gradient(to bottom right, #0f0f0f, #1a0f2c)"
			}}
		>
		<div className={`order-2 px-12 md:basis-1/2 
			${ index % 2 === 1 ? "md:order-1 md:text-right" : ""}`}
		>
			<h2 className="mb-4 text-3xl leading-8 font-light text-white">
				{song.name}
			</h2>
			<p className="mb-4 text-xl leading-7 font-light text-gray-300">
				{ song.description
				? (song.description.split(' ').slice(0, 16).join(' ')) + '...'
				: '' }
			</p>
			<SeeMoreBtn
				songID={song.id}
				handleSongSelection={handleSongSelection}
			/>
		</div>
		<div
			className={`order-1 md:basis-1/2 ${
				index % 2 === 1 ? "md:order-2" : ""
			}`}
		>
			<img
			src={ song.image }
			alt={ song.name }
			className="p-1 rounded-md border border-neutral-200 w-2/4 aspect-square mx-auto"
			/>
		</div>
	</div>
	)
}

// Džiesmas lapa – strukturāla komponente, kas satur dziesmas lapas daļas
function SongPage({ selectedSongID, handleSongSelection, handleGoingBack }) {
	return (
		<>
			<SelectedSongView
				selectedSongID={selectedSongID}
				handleGoingBack={handleGoingBack}
			/>
			<RelatedSongSection
				selectedSongID={selectedSongID}
				handleSongSelection={handleSongSelection}
		/>
		</>
	)
}

// Izvēlētās dziesmas skats- attēlo datus
function SelectedSongView({ selectedSongID, handleGoingBack }) {
	const [selectedSong, setSelectedSong] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(function () {
		async function fetchSelectedSong() {
			try {
				setIsLoading(true);
				setError(null);
				const response = await fetch('http://localhost/data/get-song/' + selectedSongID);

				if (!response.ok) {
					throw new Error("Datu ielādes kļūda. Lūdzu, pārlādējiet lapu!");
				}

				const data = await response.json();
				setSelectedSong(data); // make sure this is set correctly
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}
		fetchSelectedSong();
	}, [selectedSongID]);

	return (
		<>
			{isLoading && <Loader />}
			{error && <ErrorMessage msg={error} />}
			{!isLoading && !error && (
				<div
					className="rounded-lg mb-8 py-8 flex flex-wrap md:flex-row border-2 border-gray-900"
					style={{ background: 'linear-gradient(to bottom right, #0f0f0f, #1a0f2c)' }}
				>
					<div className="order-2 md:order-1 md:pt-12 md:basis-1/2 px-4 md:px-12">
						<h1 className="text-3xl leading-8 font-medium mb-2 text-white">
							{selectedSong.name}
						</h1>
						<p className="text-xl leading-7 font-normal text-gray-300 mb-4">
							{selectedSong.artist}
						</p>
						<p className="text-l leading-7 font-normal text-gray-300 mb-4">
							{selectedSong.description}
						</p>
						<dl className="mb-4 md:flex md:flex-wrap md:flex-row">
							<dt className="font-bold md:basis-1/4">Izdota:</dt>
							<dd className="mb-2 md:basis-3/4">{selectedSong.year}</dd>
							<dt className="font-bold md:basis-1/4">Žanrs:</dt>
							<dd className="mb-2 md:basis-3/4">{selectedSong.genre}</dd>
						</dl>
						<GoBackBtn handleGoingBack={handleGoingBack} />
					</div>
					<div className="order-1 md:order-2 md:pt-12 md:px-12 md:basis-1/2">
						<img
							src={selectedSong.image}
							alt={selectedSong.name}
							className="p-1 rounded-md border border-neutral-200 mx-auto w-2/3 aspect-square object-cover"
						/>
					</div>
				</div>
			)}
		</>
	);
}


// Līdzīgo dziesmu sadaļa

function RelatedSongSection({ selectedSongID, handleSongSelection }) {
	const [relatedSongsData, setRelatedSongsData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchRelatedSongs() {
			try {
				setIsLoading(true);
				setError(null);

				const response = await fetch(
					'http://localhost/data/get-related-songs/' + selectedSongID
				);
				if (!response.ok) {
					throw new Error('Datu ielādes kļūda. Lūdzu, pārlādējiet lapu!');
				}

				const data = await response.json();
				setRelatedSongsData(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}

		fetchRelatedSongs();
	}, [selectedSongID]);

	return (
		<>
			{isLoading && <Loader />}
			{error && <ErrorMessage msg={error} />}
			{!isLoading && !error && (
				<div className="rounded-lg mb-8 py-8 border-2 border-gray-900 bg-zinc-950"
				style={{ background: 'linear-gradient(to bottom right, #0f0f0f, #1a0f2c)' }}>
					<h2 className="text-3xl leading-8 font-bold text-neutral-100 mb-4 px-4 text-center">
					  Līdzīgas dziesmas
					</h2>

					<div className="flex flex-wrap md:flex-row md:space-x-4 px-4">
						{relatedSongsData.map((song) => (
							<RelatedSongView
								song={song}
								key={song.id}
								handleSongSelection={handleSongSelection}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
}


// Poga “Rādīt vairāk”
function SeeMoreBtn({ songID, handleSongSelection }) {
	return (
		<button
			className="inline-block rounded-full py-2 px-4 bg-black hover:bg-neutral-800 text-white font-bold cursor-pointer transition-colors duration-200"
			onClick={() => handleSongSelection(songID)}
		>Rādīt vairāk</button>
	)
}


// Līdzīgās grāmatas skats

function RelatedSongView({ song, handleSongSelection }) {
	return (
		<div className="rounded-lg mb-4 md:basis-1/3">
			<img
			  src={song.image}
			  alt={song.name}
			  className="
			  w-2/3
			  max-w-xs
			  aspect-square
			  object-cover
			  rounded-md
			  border
			  border-neutral-200
			  p-1
			  mx-auto" />

			<div className="p-4">
				<h3 className="text-xl leading-7 font-normal text-neutral-100 mb-4">
					{ song.name }
				</h3>
				<SeeMoreBtn
					songID={song.id}
					handleSongSelection={handleSongSelection}
				/>
			</div>
		</div>
	)
}

// Ielādes indikators un kļūdas
function Loader() {
	return (
		<div className="my-12 px-2 md:container md:mx-auto text-center clear-both">
			<div className="loader"></div>
		</div>
	)
}

function ErrorMessage({ msg }) {
	return (
		<div className="md:container md:mx-auto bg-red-300 my-8 p-2">
			<p className="text-black">{ msg }</p>
		</div>
	)
}

// Poga “Uz sākumu”
function GoBackBtn({ handleGoingBack }) {
	return (
		<button
			className="inline-block rounded-full py-2 px-4 bg-black hover:bg-neutral-800 text-white font-bold cursor-pointer transition-colors duration-200"
			onClick={handleGoingBack}
		>Uz sākumu</button>
	)
}


// Galvenā lietotnes komponente
export default function App() {
	
	const [selectedSongID, setSelectedSongID] = useState(null);
	
	// funkcija Song ID saglabāšanai stāvoklī
	function handleSongSelection(songID) {
		setSelectedSongID(songID);
	}
	
	// funkcija grāmatas izvēles atcelšanai
	function handleGoingBack() {
		setSelectedSongID(null);
	}
	

	return (
		<>
			<div className="
			min-h-screen
			bg-gradient-to-br
			from-zinc-950
			via-purple-950
			to-black
			text-neutral-100"
			>
				<Header />
				<main className="mb-8 px-2 md:container md:mx-auto">
					{selectedSongID 
					? <SongPage
						selectedSongID={selectedSongID}
						handleSongSelection={handleSongSelection}
						handleGoingBack={handleGoingBack}
					/>
					: <Homepage handleSongSelection={handleSongSelection} />
					}
				</main>
				<Footer />
			</div>
		</>
	)
}
