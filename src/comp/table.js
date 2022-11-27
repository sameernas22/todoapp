import { Form, Input, Popconfirm, Table, Typography,Select,Tag } from 'antd';
import React,{useState} from 'react';
var addElement;
const {Option} = Select;

let ttoday = new Date().toISOString().slice(0, 10);

var data = []
var count = 1
var taglist = []
var taggs = []
export function getData(values){
  var today = new Date();
var tday = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
  var val = []
  
  val.key = count;
  val.timestamp = tday;
  val.title = values.title;
    val.description = values.description;
    if(values.duedate !== undefined){
      val.duedate = values.duedate;
    }
    else{
      val.duedate = ""
    }
    val.stats = values.status;
    if(values.tags !== undefined){
    val.tags = values.tags;
    for(var i in val.tags){
      if(taggs.includes(val.tags[i]) === false){
        taggs.push(val.tags[i]);
      var lst = {};
      lst["text"] = val.tags[i]
      lst["value"] = val.tags[i]
      taglist.push(lst);
    }
    }
    }else{
      val.tags = []
    }
    
     
data = val
count+=1
console.log(data);
addElement()

}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  var rulz = []
  if(dataIndex === 'title' | dataIndex === 'description'){
    rulz = {
      required: true,
      message: `Please Input ${title}!`,
    }
  }else if(dataIndex === 'tags'){
    rulz = {required:false}
  }
  const inputNode = dataIndex === 'duedate' ? <Input type="date" min={ttoday}/> : dataIndex==='tags'? <Select mode="tags"/>: dataIndex==='stats'? <Select>
    <Option value="Open">Open</Option>
        <Option value="Working">Working</Option>
        <Option value="Done">Done</Option>
        <Option value="Over Due">Over Due</Option>
  </Select>: <Input/>;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          
          rules={[rulz]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
export default function ListTable(){
  const [searchText, setSearchText] = useState("")
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([])
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      title: '',
      description: '',
      tags:[],
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        
        
        setDataSource(newData);
        setEditingKey('');
        
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey('');
      }
      console.log(newData[index].tags);
      for(var i in newData[index].tags){
        if(taggs.includes(newData[index].tags[i]) === false){
          taggs.push(newData[index].tags[i])
        var lst = {};
        lst["text"] = newData[index].tags[i]
        lst["value"] = newData[index].tags[i]
        console.log(lst)
        console.log(taglist.includes(lst))
       taglist.push(lst);
        console.log(taglist)
        
      }
    }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };


  addElement = () => (
    setDataSource([...dataSource, data]))
    const handleDelete = (key) => {
      const newData = dataSource.filter((item) => item.key !== key);
      setDataSource(newData);
    };
    
    const columns = [
      {
        title: 'Time-Stamp',
        dataIndex: 'timestamp',
        key: 'timestamp',
        sorter: (a, b) =>b.timestamp.localeCompare(a.timestamp),

      },
      { 
        title: 'Task',
        dataIndex: 'title',
        key: 'title',

        
        sorter: (a, b) => a.title.localeCompare(b.title),
        editable: true,
    },
    { 
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a.description.localeCompare(b.description),
      editable: true,
    },
    {
      title: 'Due Date',
      dataIndex: 'duedate',
      key: 'duedate',

      sorter: (a, b) =>b.duedate.localeCompare(a.duedate),
      editable: true,
    },
    {
      title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        

        render: (_, { tags }) => (
          <>
            {tags.map((tag) => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
        filters: taglist,
        
      onFilter: (value, record) => record.tags.includes(value),
      editable: true,
    },
    {
      title: 'Status',
      dataIndex: 'stats',
      key: 'stats',
      filters: [
        {
          text: 'Open',
          value: 'Open',
        },
        {
          text: 'Working',
          value: 'Working',
        },
        {
          text: 'Done',
          value: 'Done',
        },
        {
          text: 'Over Due',
          value: 'Over Due',
        },
      ],
      
      onFilter: (value, record) => record.stats.includes(value),
      editable: true,
    },
    {
      title:'Operation',
      dataIndex: 'operation',
      render: (_, record) =>
      {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (<>
          <Typography.Link disabled={editingKey !== ''} 
          style={{
                marginRight: 8,
              }} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
          
          <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.key)}
        >
          <a>Delete</a>
        </Popconfirm>
        </>
        )
      }
    }
    ]
    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });

  return(
    <>
    
    <Form form={form} component={false}>
    <Table
     components={{
      body: {
        cell: EditableCell,
      },
    }}
    bordered
    columns={mergedColumns} 
    dataSource={dataSource} 

    />
    </Form>

    </>
  )
}

