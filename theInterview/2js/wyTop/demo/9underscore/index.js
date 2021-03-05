(function(root) {
    /**
     * 构造函数: _，也可以作为普通函数
     * @param {*} obj 数据源
     */ 
	var _ = function(obj) {
		if (!(this instanceof _)) {
			return new _(obj);
		}

		this.wrap = obj;
	}

    // 定义静态属性
	_.map = function(arg1, arg2, arg3) {
		//相同的
		console.log(1)
	}

	//开启链式调用
	_.chain = function(obj) { //数据源
		var instance = _(obj); //特殊的实例对象
		instance._chain = true; //特殊的属性     作为链式调用的凭证
		return instance;
	}

	var result = function(instance, obj) {
        // 如果是链式调用，则返回实例；否则返回数据源
        if(instance._chain){
            instance.wrap =  obj;
            return instance;
        }
        return obj;
	}
   
    //args  上一道工序处理之后的结果
	_.max = function(args) {
		args.push("max","long");
		return args;
	}

	//[1,2,3,,4,5,5,6,7,8,4,4,5]   数组去重 返回结果  去重之后的数组
	// 数组去重的方法
    _.unique = function(array, callback) {
		var result = [];
		var i = 0;
		for (; i < array.length; i++) {
			var target = callback ? callback(array[i]) : array[i];
			if (result.indexOf(target) === -1) {
				result.push(target)
			}
		}
		return result;
	}

	_.each = function(array, callback) {
		var i = 0;
		for (; i < array.length; i++) {
			callback.call(array, array[i]);
		}
	}

    /**
     * 获取构造函数的静态属性
     * @param {*} obj 构造函数_
     */
	_.functions = function(obj) {
		var result = [];
		for (var key in obj) {
			result.push(key);
		}
		return result;
	}
	
    // 返回源数据
	_.prototype.value = function(){
		return this.wrap;
	}

	// _.max =  ....   扩展

	//1: 找到 _ 静态属性 [map, unique, ....]     2: 遍历数组   _.prototype[item]     item?map:unique
	//搭架子
	_.mixin = function(obj) {
        // _.functions(obj) => [map, unique...]
		_.each(_.functions(obj), function(key) {
            // 当前项静态属性方法
			var func = obj[key];
			//unique
			_.prototype[key] = function() {
                // 其实是两层数组，为了func.apply(this, args)方便调用
				var args = [this.wrap];
				//数组合并
				Array.prototype.push.apply(args, arguments);

				//this 判断是否需要链式调用   this._chain === true
				//func.apply(this, args)    数据进过某个工序处理之后的结果
				return result(this, func.apply(this, args)); //[数据源， 迭代器函数]
			}
		});
	}


	_.mixin(_);
	root._ = _;
})(this)
