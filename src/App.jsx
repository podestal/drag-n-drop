import { useEffect, useState } from 'react'
import './App.css'

const App = () => {

  // filter by status
  const [data, setData] = useState([
    {title: "widget A", status: "n"},
    {title: "widget B", status: "n"},
    {title: "widget C", status: "p"},
    {title: "widget D", status: "p"},
    {title: "widget F", status: "p"},
    {title: "widget G", status: "p"},
    {title: "widget H", status: "r"},
    {title: "widget I", status: "r"},
    {title: "widget J", status: "r"},
    {title: "widget K", status: "c"},
  ])

  const [notStarted, setNotStarted] = useState(data.filter(widget => widget.status == "n"))
  const [inProgress, setInProgress] = useState(data.filter(widget => widget.status == "p"))
  const [revision, setRevision] = useState(data.filter(widget => widget.status == "r"))
  const [completed, setCompleted] = useState(data.filter(widget => widget.status == "c"))



  const handleOnDragNotStarted = (e, widgetType) => {
    e.dataTransfer.setData("widgetType", JSON.stringify(widgetType))
  }

  const handleOnDropNotStarted = e => {
    const widgetType = JSON.parse(e.dataTransfer.getData("widgetType"))
    if (widgetType.status == "p") {
      setInProgress(prev => prev.filter(widget => widget.title !== widgetType.title))
    }
    if (widgetType.status != "n") {
      setNotStarted([...notStarted, widgetType])
    }
  }

  const handleDragOverNotStarted = e => {
    e.preventDefault()
  }


  const handleOnDragInProgress = (e, widgetType) => {
    console.log("onDrag", widgetType);
    e.dataTransfer.setData("widgetType", JSON.stringify(widgetType))
  }

  const handleOnDropInprogress = e => {
    const widgetType = JSON.parse(e.dataTransfer.getData("widgetType"))
    if (widgetType.status == "n") {
      setNotStarted(prev => prev.filter(widget => widget.title !== widgetType.title))
    }
    if (widgetType.status != "p") {
      setInProgress([...inProgress, widgetType])
    }
  }

  const handleDragOverInProgress = e => {
    e.preventDefault()
  }
  
  return (
    <>
      {/* <div className='widgets'> */}
        <div className='not-started'>
          <h1>Not started</h1>
          {notStarted.map(widget => (
            <div 
              className='not-started'
              draggable
              onDragStart={e => handleOnDragNotStarted(e, widget)}
              onDrop={handleOnDropNotStarted}
              onDragOver={handleDragOverNotStarted}
            >
              {widget.title}
            </div>
          ))}
        </div>
        <div className='not-started'>
          <h1>In Progress</h1>
          {inProgress.map(widget => (
            <div 
              className='not-started'
              draggable
              onDragStart={e => handleOnDragInProgress(e, widget)}
              // onDragStart={e => handleOnDrag(e, widget)}
              onDrop={handleOnDropInprogress} 
              onDragOver={handleDragOverInProgress}
            >
              {widget.title}
            </div>
          ))}
        </div>
        <div className='not-started'>
          <h1>In Revision</h1>
          {revision.map(widget => (
            <div 
              className='not-started'
              draggable
              onDragStart={e => handleOnDrag(e, widget.title)}
            >
              {widget.title}
            </div>
          ))}
        </div>
        <div className='not-started'>
          <h1>Completed</h1>
          {completed.map(widget => (
            <div 
              className='not-started'
              draggable
              onDragStart={e => handleOnDrag(e, widget.title)}
            >
              {widget.title}
            </div>
          ))}
        </div>
        
        {/* <div
          className='widget'
          draggable
          onDragStart={e => handleOnDrag(e, "Widget A")}
        >
          Widget A
        </div>
        <div
          className='widget'
          draggable
          onDragStart={e => handleOnDrag(e, "Widget B")}
        >
          Widget B
        </div>
        <div
          className='widget'
          draggable
          onDragStart={e => handleOnDrag(e, "Widget C")}
        >
          Widget C
        </div> */}
      {/* </div> */}
      {/* <div className='page' onDrop={handleOnDrop} onDragOver={handleDragOver}>
        {widgets.map((widget, idx) => (
          <div className='dropped-widget' key={idx}>
            {widget}
          </div>
        ))}
      </div> */}
        {/* <div className='not-started'>
          <h1>In Progress</h1>
          {inProgress.map(widget => (
            <div 
              className='not-started'
              // draggable
              // onDragStart={e => handleOnDrag(e, widget.title)}
              onDrop={handleOnDrop} 
              onDragOver={handleDragOver}
            >
              {widget.title}
            </div>
          ))}
        </div> */}
    </>
  )
}

export default App
