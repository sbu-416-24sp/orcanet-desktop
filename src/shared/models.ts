export type PeerInfo = {
    Location:    string
	Latency :    string
	PeerID  :    string
	Connection : string
	OpenStreams: string 
}

export type ActivityInfo = {   
	Name         :string 
	Size         :string 
	Hash         :string 
	Status       :string 
	Peers        :number  
	lastEditTime :number
}