import { useEffect, useState } from 'react'
import './App.css'

const App = () => {

  // filter by status
  const [data, setData] = useState([
    {id: "1", title: "widget A", status: "n"},
    {id: "2", title: "widget B", status: "n"},
    {id: "3", title: "widget C", status: "p"},
    {id: "4", title: "widget D", status: "p"},
    {id: "5", title: "widget F", status: "p"},
    {id: "6", title: "widget G", status: "p"},
    {id: "7", title: "widget H", status: "r"},
    {id: "8", title: "widget I", status: "r"},
    {id: "9", title: "widget J", status: "r"},
    {id: "10", title: "widget K", status: "c"},
  ])

  const [notStarted, setNotStarted] = useState(data.filter(widget => widget.status == "n"))
  const [inProgress, setInProgress] = useState(data.filter(widget => widget.status == "p"))
  const [revision, setRevision] = useState(data.filter(widget => widget.status == "r"))
  const [completed, setCompleted] = useState(data.filter(widget => widget.status == "c"))

  // NOT STARTED   //////////////

  const handleOnDragNotStarted = (e, widgetType) => {
    e.dataTransfer.setData("widgetType", JSON.stringify(widgetType))
  }

  const handleOnDropNotStarted = e => {
    const widgetType = JSON.parse(e.dataTransfer.getData("widgetType"))
    if (widgetType.status == "p") {
      setInProgress(prev => prev.filter(widget => widget.title !== widgetType.title))
    }
    if (widgetType.status == "r") {
      setRevision(prev => prev.filter(widget => widget.title !== widgetType.title))
    }
    if (widgetType.status != "n") {
      widgetType.status = "n"
      setNotStarted([...notStarted, widgetType])
    }
  }

  // IN PROGRESS /////////////

  const handleOnDragInProgress = (e, widgetType) => {
    e.dataTransfer.setData("widgetType", JSON.stringify(widgetType))
  }

  const handleOnDropInprogress = e => {
    const widgetType = JSON.parse(e.dataTransfer.getData("widgetType"))
    if (widgetType.status == "n") {
      setNotStarted(prev => prev.filter(widget => widget.title !== widgetType.title))
    }
    if (widgetType.status == "r") {
      setRevision(prev => prev.filter(widget => widget.title !== widgetType.title))
    }
    if (widgetType.status != "p") {
      widgetType.status = "p"
      setInProgress([...inProgress, widgetType])
    }
  }

  // IN REVISION //////////////

  const handleOnDragInRevision = (e, widgetType) => {
    console.log("onDrag", widgetType);
    e.dataTransfer.setData("widgetType", JSON.stringify(widgetType))
  }

  const handleOnDropInRevision = e => {
    const widgetType = JSON.parse(e.dataTransfer.getData("widgetType"))
    if (widgetType.status == "n") {
      setNotStarted(prev => prev.filter(widget => widget.title !== widgetType.title))
    }
    if (widgetType.status == "p") {
      setInProgress(prev => prev.filter(widget => widget.title !== widgetType.title))
    }
    if (widgetType.status == "c") {
      setCompleted(prev => prev.filter(widget => widget.title !== widgetType.title))
    }
    if (widgetType.status != "r") {
      widgetType.status = "r"
      setRevision([...revision, widgetType])
    }
  }

  // COMPLETED

  const handleOnDragCompleted = (e, widgetType) => {
    e.dataTransfer.setData("widgetType", JSON.stringify(widgetType))
  }

  const handleOnDropCompleted = e => {
    const widgetType = JSON.parse(e.dataTransfer.getData("widgetType"))
    if (widgetType.status == "n") {
      setNotStarted(prev => prev.filter(widget => widget.title !== widgetType.title))
    }
    if (widgetType.status == "p") {
      setInProgress(prev => prev.filter(widget => widget.title !== widgetType.title))
    }
    if (widgetType.status == "r") {
      setRevision(prev => prev.filter(widget => widget.title !== widgetType.title))
    }
    if (widgetType.status != "c") {
      widgetType.status = "c"
      setCompleted([...completed, widgetType])
    }
  }

  const handleDragOver = e => {
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
              onDragOver={handleDragOver}
            >
              {widget.title}
            </div>
          ))}
        </div>
        <div className='in-progress'>
          <h1>In Progress</h1>
          {inProgress.map(widget => (
            <div 
              className='not-started'
              draggable
              onDragStart={e => handleOnDragInProgress(e, widget)}
              // onDragStart={e => handleOnDrag(e, widget)}
              onDrop={handleOnDropInprogress} 
              onDragOver={handleDragOver}
            >
              {widget.title}
            </div>
          ))}
        </div>
        <div className='in-revision'>
          <h1>In Revision</h1>
          {revision.map(widget => (
            <div 
              className='not-started'
              draggable
              onDragStart={e => handleOnDragInRevision(e, widget)}
              onDrop={handleOnDropInRevision}
              onDragOver={handleDragOver}
            >
              {widget.title}
            </div>
          ))}
        </div>
        <div className='completed'>
          <h1>Completed</h1>
          {completed.map(widget => (
            <div 
              className='not-started'
              draggable
              onDragStart={e => handleOnDragCompleted(e, widget)}
              onDrop={handleOnDropCompleted}
              onDragOver={handleDragOver}
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
