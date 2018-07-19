import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { hot } from 'react-hot-loader'
import screenfull from 'screenfull'
import './adminpage.css'
import './App.css'
import YoutubePlayer from 'react-youtube-player'
import ReactPlayer from 'react-player'
import Duration from './Duration'


class Videoplayer extends Component {
 constructor(props){
super(props);
this.f=0;
this.paused=0;
  this.state = {
    muteme:false,
    url: props.url,
    choice:props.choice,
    videoid:props.videoid,
    playing: props.playing,
    volume: props.volume,
    played: props.played,
    loaded: 0,
    duration:0,
    connection:props.connection,
  }
}
componentWillReceiveProps(props)
{
	this.setState({
	videoid:props.videoid,
        url: props.url,
	choice:props.choice,
        playing: props.playing,
        played: parseFloat(props.played),
	volume:props.volume,
        loaded: 0,
        duration:0,
 	connection:props.connection,
	});
	this.player.seekTo(parseFloat(props.played));
}
  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0
    })
  }
  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }
  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
	     this.state.connection.send(JSON.stringify({'videoid':this.state.videoid ,'playing':this.state.playing,'volume':e.target.value,'played':this.state.played ,'user':this.state.choice }));

  }
  onPlay = () => {
    if(this.paused==1)
	     this.state.connection.send(JSON.stringify({'videoid':this.state.videoid ,'playing':true,'volume':this.state.volume,'played':this.state.played ,'user':this.state.choice }));
this.paused=0;
  }
  onPause = () => {
	  this.f=1;
	  this.paused=1;
    this.setState({ playing: false })
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
	    console.log("down");
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
	    console.log("chnge");
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
     this.state.connection.send(JSON.stringify({'videoid':this.state.videoid ,'playing':this.state.playing,'volume':this.state.volume,'played':parseFloat(e.target.value) ,'user':this.state.choice }));

  }
  onProgress = state => {
    //console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }
  onDuration = (duration) => {
    this.setState({ duration })
  }
  ref = player => {
    this.player = player
  }
  render () {
//	  console.log(this.state);
	  if(this.f==1)
	  {
		  this.f=0;
		  this.state.connection.send(JSON.stringify({'videoid':this.state.videoid ,'playing':this.state.playing,'volume':this.state.volume,'played':parseFloat(this.state.played) ,'user':this.state.choice }));
	  }
	  console.log(this.state.url);
    const { url, playing, volume, played, loaded, duration } = this.state
    const SEPARATOR = ' · '
    return (
      <div className='app'>
        <section className='section'>
          <div className='player-wrapper'>
            <ReactPlayer
              ref={this.ref}
              className='react-player'
              width='100%'
              height='100%'
              url={this.state.url}
	      origin=""
              playing={playing}
              volume={this.state.muteme?parseFloat(0):parseFloat(volume)}
              onStart={() => console.log('onStart')}
              onPlay={this.onPlay}
              onPause={this.onPause}
              onBuffer={() => console.log('onBuffer')}
              onSeek={e => console.log('onSeek', e)}
              onError={e => console.log('onError', e)}
              onProgress={this.onProgress}
              onDuration={this.onDuration}
            />
          </div>

          <table><tbody>
            <tr>
              <th>Controls</th>
              <td>
                <button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
              </td>
            </tr>
            <tr>
              <th>Seek</th>
              <td>
                <input
                  type='range' min={0} max={1} step='any'
                  value={played}
                  onMouseDown={this.onSeekMouseDown}
                  onChange={this.onSeekChange}
                  onMouseUp={this.onSeekMouseUp}
                />
              </td>
            </tr>
            <tr>
              <th>Volume</th>
              <td>
                <input type='range' min={0} max={1} step='any' value={volume} onChange={this.setVolume} />
              </td>
            </tr>
            <tr>
              <th>Played</th>
              <td><progress max={1} value={played} /></td>
            </tr>
            <tr>
              <th>Loaded</th>
              <td><progress max={1} value={loaded} /></td>
            </tr>
	    <tr>
	    <th>mute me</th>
	    <td><input type="checkbox" onClick={(e)=>{console.log(e.target.checked);this.setState({muteme:e.target.checked})}}/></td>
	    </tr>
          </tbody></table>
        </section>
      </div>
    )
  }
}
export default Videoplayer;
