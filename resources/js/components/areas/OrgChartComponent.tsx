import React from "react"
import OrgChart from "react-orgchart"
import "react-orgchart/index.css"
import "./OrgChartComponent.css"

type OrgData = {
  name: string
  children?: OrgData[]
}

type NodeProps = {
  node: OrgData
}

type OrgChartComponentProps = {
  orgData: OrgData
}

const MyNodeComponent: React.FC<NodeProps> = ({ node }) => (
  <div className="org-node">
    <strong>{node.name}</strong>
  </div>
)

const OrgChartComponent: React.FC<OrgChartComponentProps> = ({ orgData }) => {
  return (
    <div>
      <OrgChart tree={orgData} NodeComponent={MyNodeComponent} />
    </div>
  )
}

export default OrgChartComponent
