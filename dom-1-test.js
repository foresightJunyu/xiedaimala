window.dom = {
    // 创建节点
    create(string) {
        const container = document.createElement("template")
        // trim(): 清除 string 左右两边的空格
        container.innerHTML = string.trim()
        return container.content.firstChild
    },

    // 新增弟弟
    // 因为没有 insertAfter(). 所以思路: 通过获取最后一个插入之前, 相当于最后一个插入之后(如果没有下一个节点, 那么默认为 text 或者 null, 最终也能实现)
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling)
    },

    // 新增哥哥
    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },

    // 新增儿子
    append(parent, node) {
        parent.appendChild(node)
    },

    // 新增爸爸
    wrap(node, parent) {
        parent.appendChild(node) 
    },

    // 删除节点，考虑到最新的语法 node.remove() 会不兼容, 采用找到 node 父节点然后删除其子节点, 并返回 node
    remove(node) {
        node.parentNode.removeChild(node)
        // 保留节点引用
        return node
    },

    // 删除后代(下一级)
    const(node) {
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },

    // 用于读写属性
    // 重载
    attr(node, name, value) {
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        } 
    },

    // 用于读写文本内容
    // 适配
    text(node, string) {
        if (arguments.length === 2) {
            if ("innerHTML" in node) {
                // IE方式
                node.innerHTML = string
            } else {
                // firefox, chrome
                node.textContent = string
            }
        } else if (arguments.length === 1) {
            if ("innerHTML" in node) {
                // IE方式
                return node.innerText
            } else {
                // firefox, chrome
                return node.textContent
            }
        }
         
    },

    // 用于读写 HTML 内容
    html (node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1 ) {
            return node.innerHTML
        }
    },

    // 用于修改 style 样式
    style (node, name, value ){
        if (arguments.length === 3 ) {
            node.style[name] = value
        } else if (arguments.length === 2){
            if (typeof name === 'string') {
                return node.style[name]
            } else if (name instanceof Object) {
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },

    //class 的添加/删除
    class: {
        add (node, className) {
            node.classList.add(className)
        },

        remove(node, className){
            node.classList.remove(className)
        },

        has(node, className) {
            return node.classList.contains(className)
        }
    },

    // 添加数据监听
    on (node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },

    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },

    // 获取单个/多个标签
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },

    // 获取父元素
    parent(node) {
        return node.parentNode
    },

    //获取子元素
    children(node) {
        return node.children
    },

    //用于获取兄弟姐妹元素
    siblings(node) {
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },

    // 获取弟弟
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },

    // 获取哥哥
    previous (node) {
    let x = node.previousSibling
    while (x && x.nodeType === 3) {
        x = x.previousSibling
        }
        return x
    },

    // 遍历所有节点
    each(NodeList, fn) {
        for (let i = 0; i < NodeList.length; i++) {
            fn.call(null, NodeList[i])
        }
    },

    // 获取排名第几
    index(node) {
        let list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }


}
