/**
 * AFRAME Dice Component
 */

import CANNON from 'cannon'
import {
	SCALE,
	LABELS_20,
	MATERIAL_OPTIONS,
	LABEL_COLOR,
	DICE_COLOR
} from '../constants'

AFRAME.registerComponent('dice', {
	update: function() {
		const el = this.el
		const { width, height, depth, color } = this.data

		// Create geometry.
		this.geometry = create_dice_geometry(SCALE * 0.9)
		// Create material.
		this.material = create_dice_materials(LABELS_20, SCALE / 2, 1.0)

		// Create mesh.
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		// Set mesh on entity.
		this.el.setObject3D('mesh', this.mesh)
	},

	remove: function() {
		this.el.removeObject3D('mesh')
	}
})

AFRAME.registerPrimitive('a-dice', {
	defaultComponents: {
		dice: {}
		// rotation: { x: -90, y: 0, z: 0 },
		// position: { x: 0, y: 0, z: 0 }
	},
	mappings: {
		sides: 'dice.sides'
	}
})

// helpers

function create_dice_materials(face_labels, size, margin) {
	function create_text_texture(text, color, back_color) {
		if (text == undefined) return null
		var canvas = document.createElement('canvas')
		var context = canvas.getContext('2d')
		var ts = calc_texture_size(size + size * 2 * margin) * 2
		canvas.width = canvas.height = ts
		context.font = ts / (1 + 2 * margin) + 'pt Arial'
		context.fillStyle = back_color
		context.fillRect(0, 0, canvas.width, canvas.height)
		context.textAlign = 'center'
		context.textBaseline = 'middle'
		context.fillStyle = color
		context.fillText(text, canvas.width / 2, canvas.height / 2)
		if (text == '6' || text == '9') {
			context.fillText('  .', canvas.width / 2, canvas.height / 2)
		}
		var texture = new THREE.Texture(canvas)
		texture.needsUpdate = true
		return texture
	}
	var materials = []
	for (var i = 0; i < face_labels.length; ++i)
		materials.push(
			new THREE.MeshPhongMaterial(
				Object.assign({}, MATERIAL_OPTIONS, {
					map: create_text_texture(face_labels[i], LABEL_COLOR, DICE_COLOR)
				})
			)
		)
	return materials
}

function create_dice_geometry(radius) {
	const vertices = [
		[-1, -1, -1],
		[1, -1, -1],
		[1, 1, -1],
		[-1, 1, -1],
		[-1, -1, 1],
		[1, -1, 1],
		[1, 1, 1],
		[-1, 1, 1]
	]
	const faces = [
		[0, 3, 2, 1, 1],
		[1, 2, 6, 5, 2],
		[0, 1, 5, 4, 3],
		[3, 7, 6, 2, 4],
		[0, 4, 7, 3, 5],
		[4, 5, 6, 7, 6]
	]
	return create_geom(vertices, faces, radius, 0.1, Math.PI / 4, 0.96)
}

function calc_texture_size(approx) {
	return Math.pow(2, Math.floor(Math.log(approx) / Math.log(2)))
}

function create_geom(vertices, faces, radius, tab, af, chamfer) {
	var vectors = new Array(vertices.length)
	for (var i = 0; i < vertices.length; ++i) {
		vectors[i] = new THREE.Vector3().fromArray(vertices[i]).normalize()
	}
	var cg = chamfer_geom(vectors, faces, chamfer)
	var geom = make_geom(cg.vectors, cg.faces, radius, tab, af)
	//var geom = make_geom(vectors, faces, radius, tab, af); // Without chamfer
	geom.cannon_shape = create_shape(vectors, faces, radius)
	return geom
}

function create_shape(vertices, faces, radius) {
	var cv = new Array(vertices.length),
		cf = new Array(faces.length)
	for (var i = 0; i < vertices.length; ++i) {
		var v = vertices[i]
		cv[i] = new CANNON.Vec3(v.x * radius, v.y * radius, v.z * radius)
	}
	for (var i = 0; i < faces.length; ++i) {
		cf[i] = faces[i].slice(0, faces[i].length - 1)
	}
	return new CANNON.ConvexPolyhedron(cv, cf)
}

function make_geom(vertices, faces, radius, tab, af) {
	var geom = new THREE.Geometry()
	for (var i = 0; i < vertices.length; ++i) {
		var vertex = vertices[i].multiplyScalar(radius)
		vertex.index = geom.vertices.push(vertex) - 1
	}
	for (var i = 0; i < faces.length; ++i) {
		var ii = faces[i],
			fl = ii.length - 1
		var aa = Math.PI * 2 / fl
		for (var j = 0; j < fl - 2; ++j) {
			geom.faces.push(
				new THREE.Face3(
					ii[0],
					ii[j + 1],
					ii[j + 2],
					[
						geom.vertices[ii[0]],
						geom.vertices[ii[j + 1]],
						geom.vertices[ii[j + 2]]
					],
					0,
					ii[fl] + 1
				)
			)
			geom.faceVertexUvs[0].push([
				new THREE.Vector2(
					(Math.cos(af) + 1 + tab) / 2 / (1 + tab),
					(Math.sin(af) + 1 + tab) / 2 / (1 + tab)
				),
				new THREE.Vector2(
					(Math.cos(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab),
					(Math.sin(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab)
				),
				new THREE.Vector2(
					(Math.cos(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab),
					(Math.sin(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab)
				)
			])
		}
	}
	geom.computeFaceNormals()
	geom.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius)
	return geom
}

function chamfer_geom(vectors, faces, chamfer) {
	var chamfer_vectors = [],
		chamfer_faces = [],
		corner_faces = new Array(vectors.length)
	for (var i = 0; i < vectors.length; ++i) corner_faces[i] = []
	for (var i = 0; i < faces.length; ++i) {
		var ii = faces[i],
			fl = ii.length - 1
		var center_point = new THREE.Vector3()
		var face = new Array(fl)
		for (var j = 0; j < fl; ++j) {
			var vv = vectors[ii[j]].clone()
			center_point.add(vv)
			corner_faces[ii[j]].push((face[j] = chamfer_vectors.push(vv) - 1))
		}
		center_point.divideScalar(fl)
		for (var j = 0; j < fl; ++j) {
			var vv = chamfer_vectors[face[j]]
			vv
				.subVectors(vv, center_point)
				.multiplyScalar(chamfer)
				.addVectors(vv, center_point)
		}
		face.push(ii[fl])
		chamfer_faces.push(face)
	}
	for (var i = 0; i < faces.length - 1; ++i) {
		for (var j = i + 1; j < faces.length; ++j) {
			var pairs = [],
				lastm = -1
			for (var m = 0; m < faces[i].length - 1; ++m) {
				var n = faces[j].indexOf(faces[i][m])
				if (n >= 0 && n < faces[j].length - 1) {
					if (lastm >= 0 && m != lastm + 1) pairs.unshift([i, m], [j, n])
					else pairs.push([i, m], [j, n])
					lastm = m
				}
			}
			if (pairs.length != 4) continue
			chamfer_faces.push([
				chamfer_faces[pairs[0][0]][pairs[0][1]],
				chamfer_faces[pairs[1][0]][pairs[1][1]],
				chamfer_faces[pairs[3][0]][pairs[3][1]],
				chamfer_faces[pairs[2][0]][pairs[2][1]],
				-1
			])
		}
	}
	for (var i = 0; i < corner_faces.length; ++i) {
		var cf = corner_faces[i],
			face = [cf[0]],
			count = cf.length - 1
		while (count) {
			for (var m = faces.length; m < chamfer_faces.length; ++m) {
				var index = chamfer_faces[m].indexOf(face[face.length - 1])
				if (index >= 0 && index < 4) {
					if (--index == -1) index = 3
					var next_vertex = chamfer_faces[m][index]
					if (cf.indexOf(next_vertex) >= 0) {
						face.push(next_vertex)
						break
					}
				}
			}
			--count
		}
		face.push(-1)
		chamfer_faces.push(face)
	}
	return { vectors: chamfer_vectors, faces: chamfer_faces }
}
